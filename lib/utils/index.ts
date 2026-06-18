export default function mapCategory(category: string) {
  switch (category) {
    case "Todo":
      return "Todo";
    case "Work":
      return "Work";
    case "Shopping":
      return "Shopping";
    case "Meeting":
      return "Meeting";
    case "Personal":
      return "Personal";
    default:
      return undefined;
  }
}
//  "Todo" | "Work" | "Shopping" | "Meeting" | "Personal";
