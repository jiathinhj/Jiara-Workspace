export const searchValue = ({ searchText, searchList, query }: any) => {
  const result = searchList?.filter((items: any) => {
    return items[query].toLowerCase().includes(searchText.toLowerCase());
  });
  return result;
};

// export const tripListSelector = createSelector(
//   [userTripsSelector, globalSelector],
//   (trips, global) => {
//     const tripList = searchValue(global.searchText, trips.tripList, "title");
//     return tripList;
//   }
// );

// export const sharedTripListSelector = createSelector(
//   [userTripsSelector, globalSelector],
//   (trips, global) => {
//     const sharedTripList = searchValue(
//       global.searchText,
//       trips.sharedTripList,
//       "title"
//     );
//     return sharedTripList;
//   }
// );
