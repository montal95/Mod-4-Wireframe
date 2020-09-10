export default function notes(state = [], action) {
  switch (action.type) {
    case "GET_NOTES":
      return action.notes;
    case "WIPE_ALL_NOTES":
      return [];
    default:
      return state;
  }
}
