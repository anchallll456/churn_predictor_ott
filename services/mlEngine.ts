import { CustomerData, PredictionResult, ModelMetrics, FeatureImportance, SubscriptionType } from '../types';

// Simulating a Random Forest / Logistic Regression hybrid for client-side inference
// In a real app, this would call a Flask/FastAPI backend with a .pkl model.

export const trainModel = (data: CustomerData[]): { metrics: ModelMetrics, features: FeatureImportance[] } => {
  // Calculate synthetic metrics based on the "quality" of our synthetic data
  // These represent the performance of the "trained" model on test set
  
  // Real calculation of simple accuracy
  let correct = 0;
  let truePos = 0;
  let falsePos = 0;
  let falseNeg = 0;

  data.forEach(row => {
    const pred = predictChurnProbability(row);
    const predictedClass = pred > 0.5 ? 1 : 0;
    
    if (predictedClass === row.churned) correct++;
    if (predictedClass === 1 && row.churned === 1) truePos++;
    if (predictedClass === 1 && row.churned === 0) falsePos++;
    if (predictedClass === 0 && row.churned === 1) falseNeg++;
  });

  const accuracy = correct / data.length;
  const precision = truePos / (truePos + falsePos) || 0;
  const recall = truePos / (truePos + falseNeg) || 0;
  const f1Score = 2 * ((precision * recall) / (precision + recall)) || 0;

  return {
    metrics: {
      accuracy: parseFloat(accuracy.toFixed(2)),
      precision: parseFloat(precision.toFixed(2)),
      recall: parseFloat(recall.toFixed(2)),
      f1Score: parseFloat(f1Score.toFixed(2)),
      auc: 0.88 // Synthetic AUC
    },
    features: [
      { feature: 'Support Calls', importance: 0.35 },
      { feature: 'Engagement Score', importance: 0.25 },
      { feature: 'Last Login Days', importance: 0.15 },
      { feature: 'Tenure', importance: 0.10 },
      { feature: 'Monthly Cost', importance: 0.08 },
      { feature: 'Age', importance: 0.05 },
      { feature: 'Device Count', importance: 0.02 }
    ]
  };
};

// The inference function (The "Model")
export const predictChurnProbability = (customer: Partial<CustomerData>): number => {
  let score = 0;
  
  // Base intercept
  score -= 2.0;

  // Feature weights (Logistic Regression coefficients simulation)
  if ((customer.supportCalls || 0) > 2) score += 1.5;
  if ((customer.supportCalls || 0) > 4) score += 2.0;
  
  if ((customer.engagementScore || 50) < 30) score += 1.2;
  if ((customer.engagementScore || 50) > 70) score -= 1.0;

  if ((customer.lastLoginDaysAgo || 0) > 10) score += 0.8;
  if ((customer.lastLoginDaysAgo || 0) > 20) score += 1.5;

  if ((customer.tenureMonths || 0) < 4) score += 0.5;
  if ((customer.tenureMonths || 0) > 24) score -= 0.8;

  // Plan impact
  if (customer.monthlyCost && customer.monthlyCost > 15) score += 0.3;

  // Sigmoid function to get probability 0-1
  const probability = 1 / (1 + Math.exp(-score));
  return probability;
};

export const analyzeCustomer = (customer: Partial<CustomerData>): PredictionResult => {
  const prob = predictChurnProbability(customer);
  const factors: string[] = [];
  let recommendation = "";

  // Explainability Logic
  if ((customer.supportCalls || 0) > 2) factors.push("High number of support calls indicates frustration.");
  if ((customer.engagementScore || 50) < 40) factors.push("Low engagement score (watch time/logins).");
  if ((customer.lastLoginDaysAgo || 0) > 14) factors.push("User hasn't logged in for over 2 weeks.");
  if ((customer.tenureMonths || 0) < 3) factors.push("New user in critical drop-off period.");

  // Risk Level
  let riskLevel: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
  if (prob > 0.8) riskLevel = 'Critical';
  else if (prob > 0.6) riskLevel = 'High';
  else if (prob > 0.4) riskLevel = 'Medium';

  // Recommendations
  if (riskLevel === 'Critical') {
    recommendation = "Immediate Intervention: Offer 50% discount for 3 months + Priority Support call.";
  } else if (riskLevel === 'High') {
    recommendation = "Send personalized 'We Miss You' email with curated content recommendations.";
  } else if (riskLevel === 'Medium') {
    recommendation = "Highlight new features and upcoming exclusive content in next newsletter.";
  } else {
    recommendation = "Standard retention: Continue nurturing with relevant content alerts.";
  }

  return {
    probability: parseFloat(prob.toFixed(2)),
    riskLevel,
    factors,
    recommendation
  };
};