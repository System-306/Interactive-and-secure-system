<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || empty($data["title"]) || empty($data["message"])) {
  http_response_code(400);
  echo json_encode([
    "success" => false,
    "error" => "بيانات ناقصة"
  ]);
  exit;
}

$payload = [
  "app_id" => "cb47a670-5e2f-4b55-9121-29fabcdb3746",
  "included_segments" => ["Subscribed Users"],
  "headings" => ["ar" => $data["title"]],
  "contents" => ["ar" => $data["message"]]
];

$ch = curl_init("https://onesignal.com/api/v1/notifications");
curl_setopt_array($ch, [
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json; charset=utf-8",
    "Authorization: Basic YOUR_NEW_REST_API_KEY"
  ],
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => json_encode($payload)
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$result = json_decode($response, true);

// 🔴 تحقق حقيقي من الإرسال
if ($httpCode === 200 && isset($result["id"])) {
  echo json_encode([
    "success" => true,
    "id" => $result["id"],
    "recipients" => $result["recipients"] ?? 0
  ]);
} else {
  http_response_code(500);
  echo json_encode([
    "success" => false,
    "onesignal_response" => $result
  ]);
}
