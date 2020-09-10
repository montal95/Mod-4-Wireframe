export const getNotes = (notes) => {
  return {
    type: "GET_NOTES",
    notes: notes,
  };
};

export const wipeAllNotes = () => {
  return {
    type: "WIPE_ALL_NOTES",
  };
};
