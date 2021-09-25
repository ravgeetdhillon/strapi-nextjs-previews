export default function handler(req, res) {
  // Clear the cookies set by the preview mode.
  res.clearPreviewData();

  // Send a 200-Success response to the frontend
  res.status(200).end();
}
