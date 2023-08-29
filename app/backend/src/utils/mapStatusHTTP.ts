export default function mapStatusHTTP(type: string): number {
  const statusHTTPMap: Record<string, number> = {
    success: 200,
    created: 201,
    invalidData: 400,
    unauthorized: 401,
    notFound: 404,
  };

  return statusHTTPMap[type];
}
