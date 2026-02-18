import { CustomerData, PaymentMethod, SubscriptionType } from '../types';

const DATASET_PATHS = [
  '/datasets/netflix_customer_churn.csv',
  '/datasets/Amazon_Prime_Customer_Churn.csv',
];

const toNumber = (value: string | undefined, fallback = 0): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const mapSubscriptionType = (value: string | undefined): SubscriptionType => {
  const normalized = (value || '').trim().toLowerCase();
  if (normalized === 'basic') return SubscriptionType.Basic;
  if (normalized === 'premium') return SubscriptionType.Premium;
  return SubscriptionType.Standard;
};

const mapPaymentMethod = (value: string | undefined): PaymentMethod => {
  const normalized = (value || '').trim().toLowerCase();
  if (normalized === 'credit card') return PaymentMethod.CreditCard;
  if (normalized === 'debit card') return PaymentMethod.DebitCard;
  if (normalized === 'crypto') return PaymentMethod.Crypto;
  if (normalized === 'gift card') return PaymentMethod.GiftCard;
  if (normalized === 'bank transfer') return PaymentMethod.BankTransfer;
  if (normalized === 'wallet') return PaymentMethod.PayPal;
  return PaymentMethod.PayPal;
};

const parseCsv = (csvText: string): string[][] => {
  return csvText
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => line.split(',').map(cell => cell.trim()));
};

const computeEngagementScore = (
  watchHours: number,
  avgWatchTime: number,
  lastLoginDays: number
): number => {
  const score = (watchHours * 3) + (avgWatchTime * 20) - (lastLoginDays * 1.8) + 40;
  return Math.max(0, Math.min(100, Math.round(score)));
};

const normalizeRecord = (record: Record<string, string>, sourcePrefix: string, index: number): CustomerData => {
  const id = record.customer_id || `${sourcePrefix}_${index}`;
  const age = toNumber(record.age, 30);
  const watchTimeHrsPerWeek = toNumber(record.watch_hours, 0);
  const lastLoginDaysAgo = toNumber(record.last_login_days ?? record.last_login_gap, 0);
  const monthlyCost = toNumber(record.monthly_fee, 0);
  const avgWatchTime = toNumber(record.avg_watch_time_per_day ?? record.avg_watch_time, 0);
  const churned = toNumber(record.churned ?? record.churn, 0) > 0 ? 1 : 0;
  const subscriptionType = mapSubscriptionType(record.subscription_type ?? record.subscription);
  const devices = Math.max(1, Math.round(toNumber(record.number_of_profiles, 1)));
  const videosWatched = toNumber(record.videos_watched, 0);
  const tenureMonths = Math.max(1, Math.round((videosWatched > 0 ? videosWatched / 2 : watchTimeHrsPerWeek * 1.5)));
  const supportCalls = Math.max(0, Math.round((lastLoginDaysAgo / 15) + (churned ? 2 : 0)));
  const loginsPerWeek = Math.max(1, Math.round((watchTimeHrsPerWeek / 3) + (lastLoginDaysAgo <= 7 ? 2 : 0)));
  const engagementScore = computeEngagementScore(watchTimeHrsPerWeek, avgWatchTime, lastLoginDaysAgo);

  return {
    id,
    age,
    gender: record.gender || 'Other',
    country: record.region || 'Unknown',
    subscriptionType,
    monthlyCost,
    watchTimeHrsPerWeek,
    favoriteGenre: record.favorite_genre || 'Unknown',
    devices,
    paymentMethod: mapPaymentMethod(record.payment_method),
    tenureMonths,
    loginsPerWeek,
    supportCalls,
    lastLoginDaysAgo,
    discountUsed: false,
    engagementScore,
    churned
  };
};

const parseDataset = (csvText: string, sourcePrefix: string): CustomerData[] => {
  const rows = parseCsv(csvText);
  if (rows.length < 2) return [];

  const headers = rows[0];
  const dataRows = rows.slice(1);

  return dataRows.map((cells, index) => {
    const record: Record<string, string> = {};
    headers.forEach((header, headerIndex) => {
      record[header] = cells[headerIndex] || '';
    });
    return normalizeRecord(record, sourcePrefix, index);
  });
};

export const loadChurnDatasets = async (): Promise<CustomerData[]> => {
  const datasetResults = await Promise.all(
    DATASET_PATHS.map(async path => {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load dataset: ${path}`);
      }
      return response.text();
    })
  );

  return datasetResults.flatMap((csvText, index) => parseDataset(csvText, index === 0 ? 'netflix' : 'amazon'));
};
