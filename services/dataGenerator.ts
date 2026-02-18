import { CustomerData, SubscriptionType, PaymentMethod } from '../types';

// Provided CSV Data
const CSV_CONTENT = `customer_id,age,gender,subscription_type,watch_hours,last_login_days,region,device,monthly_fee,churned,payment_method,number_of_profiles,avg_watch_time_per_day,favorite_genre
a9b75100-82a8-427a-a208-72f24052884a,51,Other,Basic,14.73,29,Africa,TV,8.99,1,Gift Card,1,0.49,Action
49a5dfd9-7e69-4022-a6ad-0a1b9767fb5b,47,Other,Standard,0.7,19,Europe,Mobile,13.99,1,Gift Card,5,0.03,Sci-Fi
4d71f6ce-fca9-4ff7-8afa-197ac24de14b,27,Female,Standard,16.32,10,Asia,TV,13.99,0,Crypto,2,1.48,Drama
d3c72c38-631b-4f9e-8a0e-de103cad1a7d,53,Other,Premium,4.51,12,Oceania,TV,17.99,1,Crypto,2,0.35,Horror
4e265c34-103a-4dbb-9553-76c9aa47e946,56,Other,Standard,1.89,13,Africa,Mobile,13.99,1,Crypto,2,0.13,Action
d8079475-5be7-47e9-8782-ceb7ff61395e,58,Female,Standard,13.8,26,Oceania,Mobile,13.99,0,Debit Card,3,0.51,Action
8e63450a-13d6-4e83-bbb5-6aebde9152cb,48,Other,Basic,13.83,20,Asia,TV,8.99,0,Gift Card,5,0.66,Romance
02387681-8c42-462a-807a-de0168c73b38,51,Male,Basic,14.3,56,Europe,Mobile,8.99,1,Gift Card,1,0.25,Action
0bcaad0c-545c-4ee1-85a6-75e165f39361,45,Other,Basic,9.98,10,Asia,Mobile,8.99,0,PayPal,3,0.91,Romance
eae6439e-8cdf-4258-ab49-c493925b927a,32,Other,Premium,2.22,34,Europe,TV,17.99,1,Debit Card,1,0.06,Drama
45a03ce3-26d0-4cd5-a9bd-22d42490b612,26,Male,Premium,15.42,36,Asia,Laptop,17.99,0,Debit Card,4,0.42,Comedy
9df43ad1-d6ee-44d0-a79b-c8ab444f10bf,28,Other,Standard,22.26,38,South America,Mobile,13.99,0,Crypto,5,0.57,Horror
4690bf9c-b828-44d3-bdb6-f91b10668288,47,Other,Standard,7.92,23,South America,TV,13.99,0,Crypto,1,0.33,Sci-Fi
0aac0e54-7d40-4cf2-abe4-45f3ff73f5ff,49,Female,Basic,5.26,33,South America,Mobile,8.99,1,Crypto,3,0.15,Documentary
e2a75072-5f48-47ed-a533-eb1b0301aad9,39,Female,Basic,10.97,10,Oceania,Mobile,8.99,0,PayPal,1,1.0,Comedy
25db8257-f409-4acd-81f8-99629fbf15a0,32,Female,Premium,40.94,7,South America,Desktop,17.99,0,Crypto,1,5.12,Action
bf48551e-a8e6-4fd9-bb32-3f798ed84680,46,Other,Premium,1.25,13,Europe,Tablet,17.99,1,Debit Card,3,0.09,Comedy
3819aaed-bed6-49c8-ab53-0fd9d917e4e1,48,Female,Standard,8.12,32,Africa,Desktop,13.99,1,Crypto,2,0.25,Action
e2f28860-44e4-4fc2-a445-014332e7fb11,68,Female,Premium,7.67,40,Oceania,Tablet,17.99,0,PayPal,4,0.19,Romance
a088d61d-be5a-409e-b943-73b145b358d1,21,Female,Standard,15.53,27,South America,Laptop,13.99,0,Credit Card,1,0.55,Comedy
109cc416-0a22-4c41-93e9-2c7dd24ddd3f,60,Male,Basic,31.9,4,Oceania,Tablet,8.99,0,Crypto,2,6.38,Comedy
a8c8dcff-92d3-4a79-849d-42c6e6bbc7bc,70,Other,Premium,7.97,57,Europe,Laptop,17.99,1,Gift Card,5,0.14,Drama
8071c1be-1197-49a1-aa75-5fb6a6b3087a,53,Other,Standard,43.02,43,South America,Tablet,13.99,0,Crypto,1,0.98,Action
98b7c57d-1094-45dd-bb45-d9bb8dff9b83,36,Other,Standard,34.6,19,Oceania,Tablet,13.99,0,Crypto,3,1.73,Action
18be905c-203f-4de2-8e78-ef10061fc57f,55,Other,Basic,24.58,18,Asia,Desktop,8.99,0,Debit Card,1,1.29,Documentary
b7c1bdad-cafb-4586-a15d-fc9ff30a8115,45,Female,Standard,7.39,6,Oceania,TV,13.99,0,PayPal,1,1.06,Romance
6e061f35-b1b5-4efe-9e37-f40a14d929b1,24,Male,Premium,6.92,13,Africa,Desktop,17.99,0,Crypto,2,0.49,Action
8c2d377b-f6ec-44b5-ae08-3660c4358a93,30,Other,Premium,1.37,55,North America,Mobile,17.99,1,Debit Card,1,0.02,Horror
afcc5c55-a3d8-4e2f-ab95-3d34f5e0390d,69,Female,Basic,24.56,53,Oceania,Laptop,8.99,1,Gift Card,1,0.45,Action
2211b077-0300-4e0c-834c-e7751a45eb96,47,Other,Standard,15.87,52,Africa,Laptop,13.99,1,Crypto,1,0.3,Sci-Fi
8d755725-4f16-4006-bdae-fa3dc9fa2579,49,Female,Standard,7.62,27,Asia,TV,13.99,0,Debit Card,3,0.27,Action
c39a5943-fe7c-46ec-8d3c-2a24ab46733b,67,Male,Standard,3.05,29,Oceania,Tablet,13.99,1,PayPal,1,0.1,Drama
e62d9bc8-dab9-42e0-b6b2-e8d076fe843b,23,Female,Premium,13.31,34,Africa,Mobile,17.99,1,Debit Card,2,0.38,Romance
7a89d8b6-28ec-4b0c-9d3b-88e0a5119e3b,67,Male,Basic,1.56,0,Oceania,Desktop,8.99,0,Crypto,5,1.56,Documentary
c8648f0f-0b92-4445-a3a7-5c48711cbc07,57,Male,Premium,0.97,32,South America,Mobile,17.99,1,Gift Card,2,0.03,Comedy
ebe928a7-de65-4567-b349-06056b35e6a6,55,Other,Standard,21.58,48,North America,Mobile,13.99,0,Credit Card,5,0.44,Romance
8b3597af-7da9-405d-9815-60d1e4dbe2e5,35,Other,Standard,22.59,16,Europe,Tablet,13.99,0,Credit Card,2,1.33,Comedy
839ec473-5f41-4a8b-955a-ec14b3a9cad4,22,Female,Standard,9.69,35,Asia,TV,13.99,1,Crypto,4,0.27,Documentary
cdf4012d-14b0-41d5-ab40-cc6627fe1e3b,34,Male,Premium,12.82,45,North America,Mobile,17.99,1,PayPal,2,0.28,Romance
aa97d1a3-c4ad-4c76-bd2a-56f1b46a753c,19,Male,Standard,4.34,1,Asia,Tablet,13.99,0,PayPal,1,2.17,Sci-Fi
6ead42f9-86d8-4c66-b2fc-3d791323186d,25,Female,Premium,15.95,15,South America,Laptop,17.99,0,Credit Card,1,1.0,Action
9235d289-6d46-46ba-a48a-1cf4ea18b599,49,Other,Premium,2.05,14,North America,Tablet,17.99,0,Debit Card,5,0.14,Romance
20529e32-d3e7-4cfc-8210-b6468cdbe2a4,55,Other,Premium,3.86,25,Europe,Tablet,17.99,1,PayPal,3,0.15,Action
bfe7729e-7d5d-4850-b496-51e891158836,36,Other,Basic,1.68,10,Africa,TV,8.99,1,PayPal,4,0.15,Action
783c7652-37b8-4be0-b8bc-fb51bd4b5578,27,Other,Premium,46.88,56,Oceania,TV,17.99,0,Crypto,3,0.82,Drama
2117b36a-9e3e-4077-ac5b-03540bb38461,49,Male,Standard,4.22,50,Oceania,Desktop,13.99,1,Gift Card,2,0.08,Comedy
ceec2c10-9770-48d1-8366-344fa66195b1,54,Female,Basic,26.88,44,South America,Desktop,8.99,0,Gift Card,3,0.6,Drama
854b2bfd-6773-413f-b385-02338fa3a316,31,Female,Standard,2.23,39,North America,Mobile,13.99,1,Debit Card,5,0.06,Drama
ee53be31-fb36-41d9-8eb2-1a4c1d976552,31,Male,Premium,14.15,24,South America,Desktop,17.99,0,PayPal,5,0.57,Drama
c9c8202c-992c-4e6c-b04f-0e2961ea87cc,42,Female,Basic,49.49,39,Europe,Mobile,8.99,0,Credit Card,5,1.24,Horror
022f9c7a-8276-494a-8629-086ad5e81df1,30,Male,Premium,8.79,21,Europe,Tablet,17.99,0,Crypto,4,0.4,Comedy
1a0f21b6-454a-4a22-88a8-5045b9d00fa4,58,Male,Standard,14.57,22,North America,Mobile,13.99,0,Debit Card,2,0.63,Romance
616199ed-33c4-4ff5-9450-251fc608d3a1,63,Other,Standard,25.73,11,Africa,TV,13.99,0,PayPal,1,2.14,Comedy
d1593b1d-ef59-4d4a-a169-5ff338b8baef,60,Male,Standard,3.01,30,Asia,Desktop,13.99,1,Gift Card,3,0.1,Documentary
749b69f5-8a24-428a-880c-86057af2a485,66,Male,Basic,12.05,33,South America,Tablet,8.99,1,PayPal,3,0.35,Drama
a2eab47c-dc4c-427f-88f8-755051b303fb,51,Female,Premium,3.7,37,South America,Mobile,17.99,1,Credit Card,2,0.1,Horror
b313f39d-0675-4bef-9b10-573146872adf,63,Male,Premium,5.84,20,Oceania,Mobile,17.99,0,Credit Card,1,0.28,Documentary
09a76bc9-4048-4403-8087-a31cdb16556e,31,Male,Basic,48.35,11,Oceania,Desktop,8.99,0,Debit Card,5,4.03,Comedy
af9b0f0d-9532-48f2-ad24-bf41faa164a6,55,Other,Standard,2.89,37,North America,Desktop,13.99,1,Debit Card,4,0.08,Action
ec202012-e4bf-4b14-b5fe-4447d8cfb730,38,Male,Premium,29.84,56,South America,Desktop,17.99,0,Credit Card,4,0.52,Drama
8c78b61b-0d41-4470-ade0-3ed2e2b36c28,65,Other,Standard,19.33,31,North America,Desktop,13.99,0,Credit Card,1,0.6,Comedy
da57899f-77b4-4b23-bcab-700db438f6d1,43,Female,Premium,2.5,33,Europe,TV,17.99,1,Credit Card,3,0.07,Action
361aff57-8a5f-4229-b4f5-f52544178dc7,63,Male,Premium,6.97,31,North America,Tablet,17.99,1,Crypto,1,0.22,Romance
900034d1-e7de-4e99-914e-4ad863061834,64,Female,Standard,3.66,6,Africa,Mobile,13.99,0,PayPal,1,0.52,Romance
6082e011-4f6d-4acb-93f2-3bfefd532880,58,Female,Basic,30.85,46,North America,Mobile,8.99,0,Debit Card,5,0.66,Action
4c7d404a-ebd5-4881-9fb5-302ad47f2fb8,31,Male,Standard,1.77,34,Europe,TV,13.99,1,PayPal,3,0.05,Sci-Fi
33146637-8d6b-4a63-b0be-65c67a894825,62,Other,Standard,16.65,41,North America,Tablet,13.99,1,Debit Card,3,0.4,Romance
746cea20-f12a-4b78-900d-fe19b5eaf91d,35,Male,Standard,25.08,2,Oceania,TV,13.99,0,Crypto,5,8.36,Action
44361538-0ea0-4b91-bef5-4c5af2dc15bd,34,Other,Standard,23.2,18,Asia,Tablet,13.99,0,Debit Card,1,1.22,Comedy
05e8a643-0a5c-4413-ae75-a4dcdccf9c62,65,Other,Premium,37.82,31,Oceania,Tablet,17.99,0,Gift Card,3,1.18,Sci-Fi
85b74247-a98b-47b1-91ba-8b7db3c3662c,68,Male,Standard,28.44,55,Europe,Laptop,13.99,0,Crypto,3,0.51,Romance
aaf3513b-97c7-46fa-b889-0d78c2ca0be7,46,Other,Standard,13.38,3,South America,Laptop,13.99,0,Credit Card,2,3.35,Romance
62d2ca00-38a2-4f3b-a517-e212fb24e26e,62,Female,Standard,14.8,40,South America,Mobile,13.99,1,Crypto,5,0.36,Drama
005b6afc-cff9-432f-ae0e-265d9acb5a59,63,Other,Premium,3.39,57,South America,Mobile,17.99,1,PayPal,4,0.06,Sci-Fi
4dbbc3f7-6ede-48ad-bf36-84c7e9188e3c,62,Female,Premium,13.15,11,Oceania,Desktop,17.99,0,Debit Card,1,1.1,Comedy
60559c1a-4093-4379-9e24-d2f033256395,41,Male,Basic,15.26,21,South America,Desktop,8.99,0,Debit Card,5,0.69,Drama
842cacde-7763-4505-bef1-538dedd13be7,27,Other,Premium,79.17,12,South America,Tablet,17.99,0,Debit Card,2,6.09,Drama
73772dd0-a793-479a-a5fa-51423747291a,60,Female,Basic,9.13,43,North America,Laptop,8.99,1,Debit Card,1,0.21,Documentary
52aa9ac1-8625-4421-8d2c-3ed00cf83389,60,Male,Premium,3.29,20,Asia,Mobile,17.99,1,Debit Card,2,0.16,Drama
72452f35-f1ef-4881-a0f6-df6de0351844,58,Female,Standard,9.52,51,Europe,Laptop,13.99,1,PayPal,1,0.18,Sci-Fi
fdf130c6-cd3c-434b-abbf-4645c8ca928d,18,Male,Standard,3.56,23,Oceania,Tablet,13.99,0,Debit Card,4,0.15,Horror
f3dd9f07-99ca-4425-8eaa-62f1a949e8b1,48,Other,Premium,11.1,41,Africa,Mobile,17.99,1,Gift Card,5,0.26,Documentary
f67b2663-cc48-4d48-a855-fc3e1e323a0f,26,Other,Standard,23.13,27,Oceania,Mobile,13.99,0,Debit Card,2,0.83,Documentary
da8c00ec-40b0-400a-90b6-ed24b0b37c89,21,Male,Premium,9.91,27,Asia,Desktop,17.99,0,Debit Card,2,0.35,Sci-Fi
6be0b14c-eaea-4580-b845-457df93bb828,46,Other,Basic,6.22,36,Asia,Laptop,8.99,1,Credit Card,2,0.17,Horror
134e6a09-9723-4652-9213-fbfecaa84377,62,Female,Premium,0.45,20,Europe,Tablet,17.99,0,Debit Card,5,0.02,Sci-Fi
31563b13-7c8d-41c6-bdf2-6a1a554574cd,35,Female,Standard,17.53,38,Oceania,Laptop,13.99,1,Credit Card,1,0.45,Action
ce40f5f8-42ee-44e2-b754-bd3a626cf48d,61,Female,Standard,4.52,21,Europe,Tablet,13.99,1,Crypto,2,0.21,Drama
2682c90e-8e16-4cb6-88ae-1348cd5a62fb,37,Male,Basic,9.69,24,Asia,Mobile,8.99,0,Credit Card,4,0.39,Horror
84cbf173-d71c-49cf-b015-0ea96838663a,46,Female,Standard,5.78,4,Asia,Laptop,13.99,0,Credit Card,2,1.16,Sci-Fi
55587cf4-5322-467e-8066-2ac35e023421,41,Female,Premium,18.87,9,Europe,TV,17.99,0,Gift Card,3,1.89,Documentary
72c5f29b-8e0a-4b81-99c2-6db14fd602a6,21,Female,Premium,4.89,3,Oceania,Desktop,17.99,0,Debit Card,4,1.22,Sci-Fi
f1e8f248-727d-47f5-92da-d6f7610cfc5b,55,Female,Premium,1.66,54,Oceania,TV,17.99,1,PayPal,4,0.03,Drama
1cb5c1a8-8724-4edc-8255-06b1152f5dea,64,Female,Premium,4.42,17,South America,Laptop,17.99,1,Crypto,3,0.25,Horror
72e27837-1995-4843-8284-fadf89a8cfe8,36,Other,Premium,13.38,22,North America,Mobile,17.99,0,Gift Card,4,0.58,Documentary
40e78b9f-b88b-4eb9-b6dd-f288901b072d,67,Female,Premium,9.87,6,Europe,TV,17.99,0,PayPal,3,1.41,Action
c82cb034-7c20-47af-901e-91379d90a183,23,Female,Premium,23.6,56,South America,TV,17.99,0,PayPal,4,0.41,Sci-Fi
6d9e258d-3110-475f-ac1c-1eba0f56b7e8,19,Male,Basic,3.89,33,North America,Mobile,8.99,1,Credit Card,1,0.11,Romance
a9661b26-d812-406e-a1e2-58f640879a0a,20,Other,Premium,3.4,33,Africa,Tablet,17.99,1,Crypto,5,0.1,Drama
747d7b40-97b1-4207-923c-72d5c3e65343,50,Female,Standard,3.58,54,Europe,Tablet,13.99,1,Credit Card,4,0.07,Romance
8ba94dad-4f0e-4aaf-b8d5-c8b4deb2195b,33,Other,Premium,31.11,39,South America,Mobile,17.99,0,Crypto,4,0.78,Comedy
cd2fbe59-0226-47ac-83f9-3aad8fdd9fd1,31,Other,Premium,2.81,39,Europe,Desktop,17.99,1,Credit Card,5,0.07,Horror
e443c6b3-1d47-4274-b231-23f2ffe08dc9,20,Male,Standard,9.87,29,Africa,Desktop,13.99,0,PayPal,3,0.33,Documentary
7fdace55-3767-41d2-85d3-e43a5eddede6,18,Female,Basic,35.52,40,South America,Tablet,8.99,0,Crypto,3,0.87,Action
85d2824e-34b3-4e81-8e27-d1426f49ae4b,31,Male,Premium,4.6,1,South America,Desktop,17.99,0,Gift Card,1,2.3,Sci-Fi
4b1e6601-b97e-479b-b01c-5228f3c6681e,47,Other,Premium,14.24,37,Africa,Tablet,17.99,1,Gift Card,2,0.37,Documentary
fa19687b-872c-4163-a900-59f1b4098ed9,49,Female,Basic,2.9,46,Asia,Mobile,8.99,1,Debit Card,2,0.06,Horror
90b17b2a-6b37-4913-acb5-70b9a7fb7400,30,Female,Basic,24.74,17,Oceania,Laptop,8.99,0,Credit Card,5,1.37,Comedy
f2d0a49a-a99d-440c-8495-66a3e2e4d7f9,22,Other,Basic,2.93,27,Asia,TV,8.99,1,Gift Card,2,0.1,Sci-Fi
79f6a459-5e71-40e9-831a-8657ed6f160b,61,Other,Standard,5.98,1,North America,Tablet,13.99,0,Gift Card,5,2.99,Romance
fd3c898e-3bfd-453b-b00e-839eaf2dd443,59,Other,Premium,24.59,49,North America,Desktop,17.99,0,Crypto,3,0.49,Romance
d88332b4-4d6a-49a9-a74c-55a5d43f3785,42,Male,Premium,18.17,2,South America,Laptop,17.99,0,Crypto,4,6.06,Sci-Fi
ad1d5a11-4a28-49fe-ab0d-9d9708af9ae4,21,Female,Basic,13.97,14,North America,Laptop,8.99,0,Credit Card,3,0.93,Romance
f5a0302a-6df7-4cad-b563-199ad2af75da,35,Male,Basic,4.58,42,South America,Tablet,8.99,1,Credit Card,4,0.11,Romance
2dab7db6-0652-42aa-9bbd-c685fadca648,32,Other,Basic,17.18,22,Africa,TV,8.99,0,Crypto,4,0.75,Romance
123f622f-26f1-431d-bc19-2219c6e7fc86,65,Female,Premium,4.89,6,Asia,TV,17.99,0,Gift Card,1,0.7,Documentary
4b9d865e-50f1-447e-8e49-89d2c6acd3b3,59,Other,Standard,6.77,22,Oceania,Tablet,13.99,0,Debit Card,1,0.29,Sci-Fi
4891e3c6-f53b-45af-ad62-12572f687302,70,Other,Basic,1.28,52,Asia,Mobile,8.99,1,Credit Card,5,0.02,Action
2e3a45b3-b511-42dd-b3e3-e9ce9d182b7a,63,Male,Premium,8.54,51,North America,Tablet,17.99,0,Credit Card,5,0.16,Documentary
5519a119-ca14-4ca1-9518-40ab23d4ea93,29,Other,Basic,17.58,2,Europe,Desktop,8.99,0,PayPal,1,5.86,Action
ccaded82-6e9b-4863-b165-cb90cb39fd26,30,Other,Basic,9.28,44,North America,Tablet,8.99,1,PayPal,4,0.21,Action
52c7f909-500a-4c6d-851d-e504c27ec859,52,Other,Basic,6.18,41,South America,Tablet,8.99,1,Gift Card,3,0.15,Comedy
d019bb17-c284-4b18-b15e-a8625a16d93f,49,Other,Standard,5.88,40,North America,Mobile,13.99,1,Crypto,2,0.14,Action
efe01bcd-e159-4494-a1d3-6e8432a0c269,33,Male,Standard,2.86,30,Europe,Tablet,13.99,1,Gift Card,5,0.09,Drama
552fb14c-c171-4f05-895a-61d49233686b,22,Female,Basic,3.71,28,Europe,TV,8.99,1,Crypto,1,0.13,Horror
99e08a07-d0de-46c9-997d-1fb9452bea46,29,Male,Basic,1.7,43,South America,Mobile,8.99,1,Debit Card,5,0.04,Horror
45291e8c-5116-4068-9168-545eecfaf691,67,Female,Standard,1.02,20,Europe,Laptop,13.99,1,Gift Card,1,0.05,Sci-Fi
00477256-578d-4abd-8ed8-3a5e75539e7a,53,Female,Premium,1.36,35,South America,Mobile,17.99,1,Gift Card,2,0.04,Romance
a8f0268f-cb07-4c40-9fde-dbe0f1c737fc,40,Male,Premium,12.26,3,North America,Mobile,17.99,0,Debit Card,5,3.06,Romance
3b237337-1044-4e5d-a612-e1a9e5f6eb36,56,Other,Premium,1.43,16,Europe,Laptop,17.99,1,Debit Card,2,0.08,Action
80e4a598-68b9-48e1-8bc0-4dbfa54d769e,35,Female,Basic,26.9,49,South America,Desktop,8.99,0,Gift Card,2,0.54,Drama
33563d42-7f51-405c-8328-8cd881128656,54,Male,Basic,3.13,16,Oceania,TV,8.99,1,Credit Card,5,0.18,Drama
4949efaa-be29-41cc-a0ee-683eaa53f442,19,Other,Basic,3.72,11,Asia,Desktop,8.99,1,Crypto,5,0.31,Documentary
4cea2a42-ffdf-49e0-a1c0-5a13b3bdffe3,28,Male,Premium,16.17,46,Africa,Laptop,17.99,1,Crypto,4,0.34,Horror
e301bbbc-80e3-4e8a-9016-545ab980b0cf,19,Other,Basic,5.18,43,Europe,Tablet,8.99,1,PayPal,4,0.12,Horror
5945dc09-1b5b-4511-ac0d-20135699628e,34,Male,Basic,1.89,59,Asia,Tablet,8.99,1,Credit Card,5,0.03,Action
69281385-44f2-48fb-abf2-dc483ee5be8b,19,Male,Premium,8.03,1,Asia,TV,17.99,0,Gift Card,3,4.01,Drama
844f2522-32e3-4f44-a960-cd0c13881618,45,Other,Basic,3.4,27,North America,Laptop,8.99,1,Crypto,3,0.12,Sci-Fi
8bc108d0-ddb9-4aa9-8c28-081008f38cb6,50,Other,Basic,0.11,1,South America,Tablet,8.99,1,Gift Card,2,0.06,Sci-Fi
7bb33e01-e208-48b0-9c0b-cd38833b1124,47,Female,Standard,40.12,55,Africa,Desktop,13.99,0,PayPal,1,0.72,Action
21f1a30f-ff82-424c-b085-7770795446c1,40,Female,Standard,32.88,36,South America,Desktop,13.99,0,Crypto,4,0.89,Sci-Fi
5fa579a5-f777-4206-98c3-de5d03627c6c,41,Female,Standard,6.26,16,Oceania,Tablet,13.99,0,Crypto,4,0.37,Action
ffdade4e-d794-42ce-a50d-25f0a5729e88,48,Other,Premium,16.78,2,Europe,Mobile,17.99,0,PayPal,1,5.59,Drama
e8fda88a-2847-4cb4-b5a0-b7f0c3454405,67,Other,Standard,3.29,25,North America,Tablet,13.99,1,Crypto,1,0.13,Documentary
e19a5270-f0e0-4586-8893-ca3fabdc2fc8,59,Female,Basic,20.11,40,South America,Desktop,8.99,1,PayPal,2,0.49,Sci-Fi
46fe1eb8-c6f9-4bd4-8a9a-d91919ed031a,60,Female,Standard,19.36,45,South America,Desktop,13.99,1,Debit Card,2,0.42,Drama
6735d050-2af6-4030-b34f-9687ab1a8914,33,Male,Basic,2.27,20,South America,Desktop,8.99,1,Debit Card,3,0.11,Romance
629a11d7-4bd9-4698-b40f-8638ffd900c7,24,Female,Basic,2.42,56,Europe,Tablet,8.99,1,Crypto,3,0.04,Comedy
39287652-cd55-45d3-99bc-5b4917558f5e,23,Other,Basic,10.85,13,North America,Mobile,8.99,0,PayPal,3,0.78,Romance
071f4ab9-b7c8-42b9-9571-dac40f75fe29,34,Male,Premium,9.59,28,Europe,Mobile,17.99,0,PayPal,4,0.33,Action
ebfb8aef-3cb5-40e2-9eed-15a73a544d43,30,Male,Premium,7.24,40,Asia,TV,17.99,0,Debit Card,5,0.18,Documentary
1ce9139b-2013-4a00-b77f-fbab1b020a00,69,Male,Standard,7.85,43,Europe,TV,13.99,1,Gift Card,5,0.18,Action
9fbdd1e9-64e2-41a4-8753-fb3412bea228,70,Female,Basic,6.8,6,North America,Mobile,8.99,0,Debit Card,4,0.97,Action
76d56597-dfb2-4223-845f-b8ff46b00ccd,42,Male,Premium,0.88,33,Oceania,Laptop,17.99,1,Credit Card,1,0.03,Comedy
7da43629-4c0f-49ff-8bf2-047e7d6ff102,34,Male,Premium,12.48,53,Asia,Tablet,17.99,1,Gift Card,2,0.23,Comedy
fb2804df-cb81-4735-a73b-15241d47b179,51,Female,Premium,2.04,6,South America,TV,17.99,0,Debit Card,2,0.29,Drama
fd5c0b28-152d-47e2-bc46-c8db8eb99985,27,Other,Premium,4.57,24,Africa,Laptop,17.99,1,Gift Card,4,0.18,Documentary
54ff35f5-4b7d-4740-a2b3-4755a628e79a,19,Male,Standard,19.23,20,Oceania,Laptop,13.99,0,Debit Card,3,0.92,Romance
8af34fa6-55d3-4e2f-bb67-94d27ba89512,18,Other,Standard,16.81,56,Oceania,Tablet,13.99,1,Credit Card,2,0.29,Drama
4ab4899e-8602-4207-8d66-b1d0037f9061,23,Other,Premium,8.17,38,Europe,Desktop,17.99,1,PayPal,3,0.21,Documentary
d0882378-87e1-4f8c-ae52-9b4c6650ed1d,23,Male,Basic,7.09,32,Europe,TV,8.99,1,Credit Card,2,0.21,Romance
95506f85-ac7c-441f-9653-2ff87e09cf22,50,Female,Premium,7.92,58,Asia,Desktop,17.99,1,Gift Card,4,0.13,Drama
78f24d23-96c3-46bf-a87a-fb61569fc00b,54,Other,Standard,10.1,40,Oceania,TV,13.99,0,PayPal,5,0.25,Horror
3d2a67b3-9cdb-4e45-9066-27e51d45cb66,68,Female,Basic,9.07,32,Africa,TV,8.99,1,Crypto,3,0.27,Romance
a8582720-4d1c-4377-8be1-a414bc51938d,70,Other,Basic,2.24,50,Europe,Laptop,8.99,1,PayPal,5,0.04,Documentary
6ad7f0b7-91f7-4c49-9d03-085ce4845c8e,28,Male,Basic,11.25,52,Europe,Laptop,8.99,1,PayPal,5,0.21,Action
a9bb3c30-19d3-4f1c-ab31-2749363de6ca,37,Male,Standard,31.31,53,South America,Mobile,13.99,0,Gift Card,1,0.58,Sci-Fi
6517898e-2c6a-4f44-a25a-33272efdc08d,51,Female,Premium,8.32,48,Europe,TV,17.99,1,Credit Card,2,0.17,Horror
ce63b3cf-0d7a-499f-a1d7-5ee3a26a0257,18,Female,Premium,6.8,20,South America,Laptop,17.99,0,Credit Card,4,0.32,Drama
5911a679-cdb3-4ccc-8ce8-491fb5a5f538,25,Female,Basic,18.4,55,Asia,TV,8.99,1,Debit Card,4,0.33,Drama
8f45c680-7d92-47c2-910e-2e4c69803700,33,Other,Basic,44.72,7,Oceania,Tablet,8.99,0,PayPal,4,5.59,Horror
9141433d-3463-435d-9b27-87d08766f03d,30,Female,Premium,3.61,43,Africa,Tablet,17.99,1,PayPal,4,0.08,Comedy
5131e34f-e327-4746-9132-241d79255ecc,22,Male,Premium,10.68,60,Africa,Tablet,17.99,0,Debit Card,5,0.18,Action
8a93c9a8-86d1-4fb8-9f0f-89ff6671601a,40,Other,Basic,8.13,4,Oceania,Tablet,8.99,0,Gift Card,4,1.63,Romance
61e92891-b875-4291-8e37-00d10b069367,44,Male,Premium,38.18,49,Oceania,TV,17.99,0,Gift Card,3,0.76,Documentary
c96e98a2-6211-4466-9096-6c389ef0143a,68,Male,Basic,1.83,0,Africa,Mobile,8.99,0,Debit Card,5,1.83,Horror
dd0dd66b-b4e4-4077-b128-50039b87c68f,24,Female,Basic,47.9,21,Oceania,Laptop,8.99,0,Debit Card,4,2.18,Romance
9945eeb5-7747-4c17-a171-35bfde1b29ff,34,Female,Standard,3.85,55,South America,Desktop,13.99,1,Gift Card,3,0.07,Romance
e3e9c377-2cb7-4ec4-a85a-f59b9e6f298d,62,Female,Basic,1.55,17,South America,Tablet,8.99,1,Debit Card,2,0.09,Action
01bcc59b-2ffe-4146-9c55-05195c1bfd4f,29,Female,Standard,7.46,58,Asia,Tablet,13.99,0,Credit Card,5,0.13,Drama
66ee8b3e-54d4-47b0-9bdf-a9830a3be6f0,62,Female,Basic,6.67,47,North America,TV,8.99,1,Gift Card,2,0.14,Documentary
042c6d84-17fa-4c97-a537-dcc1ebfc9b19,20,Female,Premium,4.57,17,South America,Laptop,17.99,1,Gift Card,1,0.25,Comedy
37bf780f-45c1-471c-8158-9f211fbf9e0a,60,Female,Standard,1.03,2,Asia,Tablet,13.99,0,PayPal,5,0.34,Documentary
57bea9bb-8e3b-4a70-831b-89ec71163a30,25,Other,Standard,6.71,2,Africa,Tablet,13.99,0,Credit Card,4,2.24,Sci-Fi
ea197301-ecc0-4b24-b3f2-f9c7aa3efccf,57,Male,Standard,12.95,27,North America,TV,13.99,0,Gift Card,4,0.46,Horror
31dab47e-d021-4d4b-8284-98460539ef0a,47,Male,Standard,3.92,58,Africa,Tablet,13.99,1,PayPal,5,0.07,Horror
339bd217-4512-4fce-8e0f-a8ee2938f548,54,Male,Basic,24.44,28,North America,Laptop,8.99,0,Gift Card,4,0.84,Drama
e4696783-b60d-40f9-8556-b6aaca0439bb,34,Female,Standard,28.76,11,North America,Mobile,13.99,0,PayPal,2,2.4,Documentary
6131b5ac-7daf-4a54-9f44-63fe0fcca85f,52,Male,Standard,1.35,7,Asia,TV,13.99,1,Crypto,1,0.17,Action
c81ba12a-e438-42fc-9d0a-045fb8a0e87a,53,Other,Premium,0.25,50,Asia,Tablet,17.99,1,PayPal,1,0.0,Romance
d9706e06-14bf-475c-aeb6-1eaaf5a3dd1b,68,Female,Premium,10.27,55,North America,Tablet,17.99,0,PayPal,4,0.18,Horror
db2af8cb-89e8-4d68-b1b4-6620a2d5d041,68,Male,Premium,52.22,4,North America,Laptop,17.99,0,Gift Card,1,10.44,Romance
b84c61be-3dbf-4706-9ac0-bf2c77b54dde,55,Other,Standard,7.61,37,North America,Mobile,13.99,1,PayPal,1,0.2,Comedy
29c66269-9ffd-4c33-a193-ce878aadd03e,31,Male,Basic,11.05,51,North America,TV,8.99,1,PayPal,1,0.21,Horror
5515be5c-4926-4e19-abbf-6f2f6c8da2ac,30,Other,Standard,17.22,5,South America,Laptop,13.99,0,PayPal,1,2.87,Horror
65967ad4-dae6-45d3-9af8-3897eed4bdfb,56,Female,Premium,2.39,21,South America,Tablet,17.99,1,Debit Card,2,0.11,Comedy
ac2f51d0-0824-4f84-b2cd-ab20ec04b858,44,Other,Basic,14.91,47,Europe,Desktop,8.99,1,Debit Card,5,0.31,Horror
f1c3c48d-f3d2-4d85-a8c3-f1a96eaacad9,64,Male,Standard,13.86,7,Africa,Laptop,13.99,0,Credit Card,3,1.73,Comedy
2986574c-65fa-40e8-ae90-3c745b045804,42,Other,Basic,2.6,50,South America,Laptop,8.99,1,Credit Card,4,0.05,Romance
533ad58f-7675-4e1f-8a7b-27f64e6ac546,18,Other,Premium,17.75,9,Oceania,Desktop,17.99,0,Gift Card,1,1.77,Comedy
bf84e8d8-05ec-42a0-acea-ef18118399c7,56,Male,Basic,8.71,2,Asia,Laptop,8.99,0,Debit Card,3,2.9,Drama
ec781d62-dcea-497b-a9e4-c17263747c67,23,Male,Premium,10.39,2,North America,TV,17.99,0,PayPal,4,3.46,Romance
8b81a984-02e2-48aa-9ff5-5f1868dcf643,23,Female,Basic,18.25,30,South America,Mobile,8.99,0,Crypto,5,0.59,Documentary
56406333-657b-4c54-8abd-6493fcfb3683,65,Other,Premium,20.05,21,Asia,Tablet,17.99,0,Crypto,5,0.91,Documentary
7ce062a1-89ad-45c1-a25a-0b3b4ee4ec72,47,Other,Basic,0.39,48,South America,Tablet,8.99,1,PayPal,5,0.01,Romance
2febe28b-3c16-4efb-9188-1f37a1c01d82,36,Female,Premium,50.98,23,Asia,Mobile,17.99,0,Gift Card,4,2.12,Comedy
0480261e-6011-440b-862c-17eb4d5f183f,54,Other,Premium,0.56,30,North America,Tablet,17.99,1,Debit Card,2,0.02,Horror
5af996e6-33fe-477d-a99e-1c10776fda79,56,Other,Standard,1.95,28,North America,Mobile,13.99,1,Crypto,4,0.07,Romance
dae2da1f-76cb-41c0-b04f-33dc860fcf32,34,Male,Premium,70.61,38,Oceania,TV,17.99,0,Credit Card,5,1.81,Comedy
9be09f8c-f7dc-49dd-8c6b-25c8f448d92f,70,Other,Standard,8.7,46,Asia,Mobile,13.99,1,Credit Card,3,0.19,Action
a15b0804-4a6c-4410-b37f-a4986930e827,51,Male,Basic,2.17,14,Africa,Tablet,8.99,1,Debit Card,3,0.14,Horror
6354bb8b-9f9d-440d-bcaf-fb281e48866e,57,Female,Basic,15.75,1,Europe,Desktop,8.99,0,Crypto,3,7.88,Horror
c9c2f14e-1e0f-467a-90f5-e8512a867bf1,36,Female,Basic,3.58,14,North America,Tablet,8.99,1,PayPal,2,0.24,Romance
73b4ab33-132d-4c64-b52d-c9aa2e2f85d6,67,Other,Standard,14.58,18,Europe,Desktop,13.99,0,Credit Card,2,0.77,Sci-Fi
a03703b4-96da-4fc9-ab23-dc087a013b7d,66,Other,Standard,1.42,57,Europe,Laptop,13.99,1,Gift Card,3,0.02,Drama
8e10ed31-6232-49d2-9def-3cb40206c216,42,Female,Basic,2.98,29,Asia,TV,8.99,1,Crypto,4,0.1,Comedy
2c8412ce-38b1-4edd-9a05-23df72e6ec65,34,Female,Standard,0.68,42,Africa,Desktop,13.99,1,Crypto,2,0.02,Comedy
06d02ff5-4241-48cf-88cd-83e965c477fa,49,Other,Standard,2.26,31,Europe,Laptop,13.99,1,PayPal,5,0.07,Comedy
feb1f73a-8cc1-44c9-a58e-83bc8d1fd127,66,Female,Basic,6.93,47,South America,Tablet,8.99,1,PayPal,3,0.14,Sci-Fi
8f511109-28d6-4502-bb4a-02a31d2fd9b1,24,Female,Premium,11.67,31,Oceania,Mobile,17.99,1,Crypto,3,0.36,Sci-Fi
908d1c29-96cd-4d12-9b7b-6f25c85d46ea,49,Other,Premium,5.31,39,Europe,TV,17.99,1,Credit Card,1,0.13,Comedy
59b1d940-2563-4884-9944-87129d5a5399,65,Other,Standard,1.83,37,Africa,Desktop,13.99,1,Credit Card,1,0.05,Comedy
a229903c-f733-4e37-8f53-26759271a27d,52,Female,Standard,2.62,43,South America,Mobile,13.99,1,Gift Card,5,0.06,Documentary
ecd9a401-3be9-4ff9-8b82-7491e8de3376,61,Other,Premium,0.85,6,Europe,TV,17.99,1,Crypto,1,0.12,Horror
82247ee5-3c0e-45db-b734-31cf92c63a7a,50,Female,Standard,5.02,47,Africa,Mobile,13.99,1,Crypto,3,0.1,Horror
8874bf6b-73ab-4361-9955-e6d678400a2f,56,Other,Premium,19.81,25,Asia,Tablet,17.99,0,Credit Card,4,0.76,Sci-Fi
41e580ba-a11a-416e-863f-d94f0fcb729e,36,Other,Premium,18.47,28,Asia,Tablet,17.99,0,Credit Card,2,0.64,Horror
80304332-21c7-4123-9691-ec47680ef521,40,Female,Standard,22.52,8,Africa,Laptop,13.99,0,PayPal,5,2.5,Comedy
e2bade9e-76ad-4e9c-b851-f15137431ca2,23,Female,Premium,11.54,28,Europe,Laptop,17.99,0,Gift Card,5,0.4,Sci-Fi
93991bdd-3b61-4167-ba40-807e3fc24cce,49,Female,Basic,38.43,6,Oceania,Tablet,8.99,0,PayPal,3,5.49,Drama
5b14b084-6bd2-4df4-b9c5-8839f9e9680a,68,Female,Standard,2.7,35,Asia,TV,13.99,1,Debit Card,1,0.08,Documentary
10e3667e-01b2-4340-8f1e-f6eca396f00c,52,Other,Standard,1.79,38,Africa,Mobile,13.99,1,Credit Card,1,0.05,Drama
ba539916-0de8-4f60-9b2f-fb07ba7f1193,37,Male,Standard,13.86,46,South America,Laptop,13.99,1,Gift Card,3,0.29,Documentary
ae95f50e-1e2f-4f65-874d-0b6bc9427707,33,Female,Basic,0.14,37,Europe,TV,8.99,1,PayPal,5,0.0,Sci-Fi
10fa7f05-3ce2-4829-bafa-78e5001ebaa0,26,Other,Premium,19.48,35,Oceania,Laptop,17.99,0,PayPal,5,0.54,Horror
c92450d6-b3fa-47a1-82ac-ebbf6f022eac,37,Male,Basic,4.84,25,Africa,Laptop,8.99,1,PayPal,5,0.19,Action
bc58e790-61ad-438b-9059-67adee68af43,36,Other,Premium,8.7,45,South America,Mobile,17.99,0,PayPal,4,0.19,Drama
a59003ca-fc14-4078-9ed4-d9dbf9d91826,61,Male,Premium,19.19,27,South America,Mobile,17.99,0,PayPal,2,0.69,Horror
075f3920-d7be-49de-b9a8-04ae797d2806,43,Male,Basic,0.53,22,Europe,TV,8.99,1,PayPal,1,0.02,Romance
c562cd9e-2437-4343-afd8-740938a1b59b,62,Male,Basic,7.85,53,Europe,Mobile,8.99,1,PayPal,2,0.15,Romance
e85f81f9-f1c6-4db6-91b8-a68d9a225b14,70,Other,Premium,42.5,46,Europe,Laptop,17.99,0,Credit Card,2,0.9,Drama
95b61ee7-ccc7-4c12-b422-3518fa9a9de9,34,Male,Standard,6.33,49,Europe,Laptop,13.99,0,Debit Card,4,0.13,Action
9479a993-2027-4f6b-90c3-76082a333411,38,Female,Basic,33.5,56,Asia,Laptop,8.99,0,PayPal,2,0.59,Action
258fb686-a114-48c9-b4d9-45d0e773064f,67,Female,Basic,2.55,48,Oceania,Laptop,8.99,1,Gift Card,2,0.05,Sci-Fi
dc507aeb-ca76-409a-9ff8-09dd364e0754,39,Female,Premium,47.79,12,North America,TV,17.99,0,Gift Card,1,3.68,Comedy
ed01a482-affc-4e7f-a7b4-ff9fcde8024a,22,Other,Basic,26.28,48,Europe,TV,8.99,0,Crypto,3,0.54,Sci-Fi
af94b7ff-2542-4364-b5fb-a71e0250ef2d,67,Male,Premium,1.04,17,Europe,Mobile,17.99,1,Gift Card,2,0.06,Romance
0e678d61-af68-4c15-8870-34aeb9e546de,42,Female,Standard,9.91,14,Africa,Desktop,13.99,0,Crypto,1,0.66,Comedy
0507202b-60a0-4db0-9d84-d54696712eb1,32,Other,Premium,16.39,27,Europe,Desktop,17.99,0,Gift Card,5,0.59,Horror
613bfc9a-f30f-416c-802a-2aa9327cfa58,36,Other,Standard,32.78,51,Asia,Laptop,13.99,0,Debit Card,5,0.63,Documentary
77cf8860-f7d9-4320-a1eb-c06c6b3941db,35,Male,Premium,1.95,52,Africa,Tablet,17.99,1,Credit Card,5,0.04,Drama
fe5de36a-ab2a-40c9-9697-4578c5212b9e,49,Other,Standard,5.02,26,South America,Tablet,13.99,0,Credit Card,4,0.19,Documentary
b512d943-7962-447f-9112-8ff4bf5b2767,41,Female,Basic,36.94,6,Africa,Tablet,8.99,0,Credit Card,4,5.28,Drama
c91b0ee0-8912-4f6a-bad2-32747ee6e7b4,48,Female,Basic,1.3,2,South America,Mobile,8.99,1,Crypto,4,0.43,Drama
461b021e-97a5-486b-921b-6642c9d3e82a,34,Male,Premium,0.33,7,Asia,Tablet,17.99,1,Gift Card,2,0.04,Horror
ce433abe-57fd-4e3d-9342-2e73dfda078b,28,Other,Premium,5.03,59,Oceania,TV,17.99,1,Crypto,1,0.08,Drama
8c0e6937-e5a5-4e4b-80e6-734497960ec4,61,Female,Basic,1.21,31,Europe,Tablet,8.99,1,Crypto,3,0.04,Drama
c6b0204e-436a-40a3-8de9-2f3a84d799b7,23,Other,Premium,3.51,16,Asia,Desktop,17.99,0,Credit Card,5,0.21,Drama
7b0bee97-a383-498d-a1d0-2de7c824ce74,30,Female,Premium,3.55,45,South America,Desktop,17.99,1,Gift Card,3,0.08,Romance
5ec455c9-3823-4034-b614-261b8e723d17,40,Female,Basic,7.02,44,Africa,Tablet,8.99,1,Gift Card,4,0.16,Horror
95613c6d-17d2-4b03-8c8b-9ebe03768f44,18,Male,Basic,15.17,28,South America,Mobile,8.99,0,PayPal,3,0.52,Documentary
8a88927d-a219-4bb5-8f16-acc4c3171dbf,47,Male,Standard,17.12,22,Europe,Desktop,13.99,0,Credit Card,1,0.74,Documentary
d8da3b68-dfd2-48bb-8717-352605346780,61,Female,Basic,12.93,55,Oceania,Tablet,8.99,1,Debit Card,4,0.23,Sci-Fi
6627f98b-c514-4d31-9be0-73d1f859e0bc,50,Male,Standard,7.88,43,Europe,Tablet,13.99,1,Crypto,1,0.18,Horror
c0361c14-77f2-4833-ae4a-4fe578223f75,42,Other,Basic,5.55,47,Europe,Tablet,8.99,1,Gift Card,2,0.12,Drama
8ad4594c-beba-471b-abe6-8071694e4294,60,Male,Basic,4.61,8,North America,Mobile,8.99,1,PayPal,3,0.51,Sci-Fi
2b408c37-307e-4e4b-aa9e-df26fd74e648,46,Male,Basic,19.74,20,Asia,Mobile,8.99,0,Debit Card,1,0.94,Horror
b943a742-e530-4b1d-a717-b6f72c8eb0df,49,Other,Premium,19.67,54,Europe,Mobile,17.99,0,Credit Card,5,0.36,Documentary
86ca5953-8687-4fd4-ad11-0d5d680458a8,63,Other,Premium,0.3,12,Asia,Laptop,17.99,1,Credit Card,2,0.02,Drama
1e06d863-a4c7-4967-8340-46c14cb445a0,41,Male,Basic,7.73,31,Asia,Tablet,8.99,1,Gift Card,4,0.24,Documentary
860a5a69-185b-4aef-8746-502864830574,63,Male,Basic,1.03,3,North America,Tablet,8.99,1,Credit Card,5,0.26,Documentary
fd6488c2-9e1f-4227-9498-0a49f3702153,33,Male,Standard,9.93,51,South America,Tablet,13.99,0,Debit Card,4,0.19,Romance
0de32e81-bbd2-465d-a0bd-dc9981e9de95,51,Male,Standard,2.56,53,Oceania,Desktop,13.99,1,PayPal,2,0.05,Romance
d3d8842a-961b-4951-ad19-f2ce40f0bd6c,59,Female,Standard,2.28,38,Africa,Desktop,13.99,1,PayPal,3,0.06,Drama
251b46dc-0342-44cf-8868-ac80695ec9df,44,Male,Standard,1.17,51,South America,Tablet,13.99,1,Credit Card,3,0.02,Romance
10b94520-29d7-4845-917f-98fd0a3bf3e7,22,Female,Premium,21.84,1,Oceania,Mobile,17.99,0,Credit Card,1,10.92,Horror
c73edd98-948a-45a2-bf02-d8556d7771c1,25,Female,Premium,10.53,33,Oceania,Tablet,17.99,1,Debit Card,3,0.31,Sci-Fi
15977af7-baf7-4922-ac0b-06541e0271d3,26,Male,Standard,8.43,45,North America,Laptop,13.99,0,Debit Card,5,0.18,Comedy
3ca42ba1-9483-49c4-9da0-3261165ecb8e,51,Other,Premium,23.55,13,South America,TV,17.99,0,Credit Card,2,1.68,Drama
14ab6691-c9c4-479d-b472-b54fad1ea99e,46,Female,Standard,41.63,46,South America,Tablet,13.99,0,Debit Card,4,0.89,Comedy
32777b99-f320-4575-93f0-635af1cf0b43,35,Male,Premium,1.11,13,South America,Mobile,17.99,0,Credit Card,4,0.08,Sci-Fi
baee1593-6034-48d7-8a84-7486c56e1563,50,Female,Premium,5.41,35,North America,Desktop,17.99,1,Gift Card,4,0.15,Action
b81c0235-959b-4e73-af06-1a55896f1693,54,Female,Standard,11.79,39,Asia,Laptop,13.99,1,Debit Card,2,0.29,Documentary
314e27f7-020f-48a3-8914-5c0b51f67d00,27,Male,Standard,0.39,32,South America,Laptop,13.99,1,Gift Card,4,0.01,Action
cb507a43-512e-4dec-be49-2489ad065c20,18,Male,Premium,0.97,9,Africa,Tablet,17.99,0,Debit Card,5,0.1,Sci-Fi
505fa98f-6743-4996-abac-4dfadbf39cef,59,Female,Basic,4.16,25,Europe,Tablet,8.99,1,Crypto,2,0.16,Horror
b7842c18-8a7c-427d-985c-190fa574149d,37,Male,Premium,13.91,27,Asia,Laptop,17.99,0,PayPal,5,0.5,Comedy
51efc330-55c5-4b72-98ef-7bb6c3a82162,44,Female,Premium,3.73,49,Oceania,TV,17.99,1,Credit Card,5,0.07,Drama
d798a26c-3ede-4a44-b16a-a49c50e8f053,28,Male,Standard,10.91,16,North America,Tablet,13.99,0,Debit Card,4,0.64,Drama
7b5ec85e-2ca0-4c16-a1d2-daa5e187fc5c,23,Other,Premium,5.56,53,Europe,Laptop,17.99,1,Credit Card,1,0.1,Romance
10424d23-f638-4f9b-b107-3a3fc714ebdb,58,Other,Premium,4.04,19,Asia,Mobile,17.99,0,Credit Card,4,0.2,Romance
318b785e-376e-47cc-bf21-95b314654f83,23,Female,Standard,0.13,48,Europe,Laptop,13.99,1,Crypto,5,0.0,Sci-Fi
844f557e-b944-4ca0-aa50-1ce827d8bcb8,36,Female,Basic,20.03,16,Africa,Desktop,8.99,0,Debit Card,5,1.18,Comedy
03e51425-ede3-4da6-9769-2ac43a43a6c8,37,Other,Basic,20.45,54,Asia,Desktop,8.99,0,Debit Card,4,0.37,Action
f18f3f06-7f7a-4860-8d04-5656e811782e,48,Other,Basic,4.91,1,North America,Mobile,8.99,1,PayPal,1,2.46,Action
6abb7d1e-a927-4b88-a4f6-a995b5c42361,23,Male,Standard,28.75,20,Asia,TV,13.99,0,Crypto,2,1.37,Horror
3aabb525-5a7b-4668-af65-a641a594a772,35,Other,Basic,10.43,46,Oceania,Mobile,8.99,1,Credit Card,4,0.22,Sci-Fi
4cb69e88-ac09-4383-b583-af8ac1ed8aa7,52,Other,Premium,11.5,53,Europe,TV,17.99,1,Crypto,5,0.21,Documentary
9eb4965a-d5d7-4223-abf2-4bc3205567d5,50,Other,Standard,1.49,8,Asia,Laptop,13.99,0,Credit Card,4,0.17,Documentary
40c040fc-9b95-4b3b-871a-21ff700d0f77,68,Male,Premium,17.56,29,Asia,Laptop,17.99,0,Debit Card,4,0.59,Sci-Fi
83a0d0df-f602-47a7-8f84-ff7b087eb234,30,Other,Premium,15.15,55,South America,TV,17.99,1,Credit Card,3,0.27,Comedy
5226d599-736b-422f-bf60-186a26fdeaca,41,Other,Basic,18.51,8,Asia,Mobile,8.99,0,Credit Card,2,2.06,Drama
fa3df7a7-031b-4bc3-ad1c-12c10ebc05f7,56,Other,Basic,16.89,38,Europe,TV,8.99,1,Debit Card,2,0.43,Horror
330da1e1-f14f-48b1-a950-169e4c02303d,19,Male,Basic,0.22,21,Oceania,Mobile,8.99,1,Debit Card,4,0.01,Drama
d9536bca-b67a-4e23-88b3-27208462b5f0,32,Female,Standard,11.33,42,Europe,Mobile,13.99,1,Credit Card,1,0.26,Sci-Fi
503bb6a2-47c8-4dee-b381-3b5415ad89c9,60,Other,Basic,7.79,25,North America,TV,8.99,0,Debit Card,2,0.3,Drama
ff0a52b7-4a72-4a00-b2b9-926f67c65a15,52,Male,Basic,0.12,25,South America,Mobile,8.99,1,Gift Card,4,0.0,Documentary
97b76db8-4504-438b-b561-4b8c8976c938,70,Female,Premium,1.04,37,South America,Tablet,17.99,1,PayPal,2,0.03,Horror
f5194307-2cf2-4d42-a353-6ed0142b7dee,48,Female,Premium,16.1,20,South America,Mobile,17.99,0,Gift Card,4,0.77,Romance
bb60c0f0-462a-411c-bd4a-be52a830f801,49,Other,Premium,0.65,34,South America,Laptop,17.99,1,Credit Card,3,0.02,Drama
2147d452-2d5c-4618-aaba-e7feb7d322f5,52,Female,Basic,0.3,21,Europe,Mobile,8.99,1,Gift Card,2,0.01,Horror
12f4c115-7090-47f6-9450-7f3c5b7ce2ee,37,Male,Standard,16.01,11,Europe,Laptop,13.99,0,Debit Card,4,1.33,Horror
2f2b96aa-a4b0-47fd-8163-128e7da936ac,39,Female,Basic,33.36,37,South America,TV,8.99,1,Crypto,1,0.88,Sci-Fi
071580bb-2081-42f1-82d9-55d269964fed,70,Female,Basic,3.99,24,Africa,Laptop,8.99,1,Gift Card,1,0.16,Horror
49460bf3-2d1f-48a8-abca-b6af133f2803,68,Male,Basic,17.26,10,South America,Desktop,8.99,0,Credit Card,3,1.57,Documentary
1cddb6f1-fc2f-4e07-887b-e3703974af83,26,Other,Standard,4.64,7,Asia,Desktop,13.99,1,Crypto,1,0.58,Comedy
00ed9abb-99cc-4b26-bac4-eab742a14f5a,49,Female,Premium,5.0,17,Oceania,Mobile,17.99,0,Crypto,1,0.28,Drama
304e77f6-80f7-4820-affe-f288fb212762,18,Male,Premium,12.42,58,North America,Laptop,17.99,1,Debit Card,3,0.21,Horror
f1664406-d734-495d-8499-225258ceb44d,28,Other,Basic,16.54,24,South America,Laptop,8.99,0,Crypto,3,0.66,Romance
2e7f0f39-fa6e-4eb0-92de-1ec80999427b,57,Female,Premium,0.26,28,Europe,Tablet,17.99,1,Credit Card,2,0.01,Action
6419436c-0144-4b48-a8be-7a43d909a91d,47,Female,Basic,17.94,19,Oceania,Tablet,8.99,0,PayPal,2,0.9,Action
407bcc3b-fda7-46f1-ad86-4fb4b4d34e84,18,Male,Standard,41.28,24,Europe,Desktop,13.99,0,Debit Card,3,1.65,Action
0c7c7313-11c4-4127-86d9-7db7dbc296b3,48,Male,Basic,3.34,1,Oceania,Mobile,8.99,1,Credit Card,1,1.67,Comedy
fb18811c-c703-4f82-8119-20f4341d811e,26,Female,Premium,3.13,18,Oceania,Laptop,17.99,0,PayPal,5,0.16,Sci-Fi
2ef8917f-008f-4cda-ac07-1c700c111afd,24,Other,Basic,3.02,21,Asia,Tablet,8.99,1,Gift Card,5,0.14,Comedy
61e9d50e-dbe8-4e0c-99cc-cfd614f9da3c,40,Other,Standard,7.82,8,North America,Tablet,13.99,0,Credit Card,2,0.87,Documentary
9eb92a08-3a88-47a8-93ed-717e041463d3,50,Female,Basic,0.82,1,North America,Mobile,8.99,1,PayPal,5,0.41,Drama
4ed3af39-edab-4a77-a166-978bd2fe04c3,49,Male,Basic,13.95,21,Oceania,Laptop,8.99,0,PayPal,1,0.63,Sci-Fi
7325ea2c-d50b-4cd1-aad0-245a0602f7ce,55,Female,Premium,41.03,45,Africa,Laptop,17.99,0,Debit Card,3,0.89,Documentary
4e354ac7-0a8e-4e95-bea1-a9075202ef61,20,Female,Premium,20.62,13,Asia,TV,17.99,0,Debit Card,4,1.47,Sci-Fi
4857b9de-1edb-4296-b3ad-7a33e68f0c85,31,Other,Basic,11.3,37,South America,Mobile,8.99,1,PayPal,3,0.3,Romance
d5092d9c-c22a-462c-ab30-88227da4a8bd,66,Female,Premium,5.8,41,Oceania,TV,17.99,1,PayPal,2,0.14,Documentary
cae4eb59-460f-4819-82ee-b5ac5de9a5bc,58,Other,Standard,24.34,31,Asia,Laptop,13.99,0,Crypto,1,0.76,Comedy
45fae5a6-eb08-4eae-9ec0-d6530ad02310,54,Other,Basic,7.19,56,North America,Desktop,8.99,1,Gift Card,2,0.13,Romance
aaf921c3-5870-4508-8814-a72e0cbd10ff,40,Male,Standard,13.33,24,North America,TV,13.99,0,Crypto,3,0.53,Romance
fbf6539b-a9e0-4443-8cd2-46cc1f1c7f81,56,Other,Premium,1.65,30,Africa,Mobile,17.99,1,Gift Card,4,0.05,Action
a1683619-5cc2-49c0-9830-26abcf323125,34,Male,Standard,10.55,54,Asia,Tablet,13.99,0,PayPal,5,0.19,Sci-Fi
