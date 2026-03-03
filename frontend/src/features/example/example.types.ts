export interface ExampleItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface HelloResponse {
  message: string;
  timestamp: string;
  items: ExampleItem[];
}
