export const itemPriority = [
  { id: "1", label: "Priority - 1" },
  { id: "2", label: "Priority - 2" },
  { id: "3", label: "Priority - 3" },
  { id: "4", label: "Priority - 4" },
  { id: "5", label: "Priority - 5" },
];

// Only one column, multisort not supported now
export const gridConfig = [
  { id: "id", label: "Item Id", sort: false },
  { id: "created", label: "Created", sort: false },
  { id: "desc", label: "Description", sort: false },
  { id: "priority", label: "Priority", sort: true, sortOrder: "asc" },
  { id: "actions", label: "Actions", sort: false },
];
