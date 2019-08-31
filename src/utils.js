const fetchFromItunes = async input => {
  try {
    const fetchedItunes = await fetch(
      `https://itunes.apple.com/search?term=${input}&media=music&limit=200&entity=song`
    );
    const fetchedItunesToJson = await fetchedItunes.json();
    const onlySongs = await fetchedItunesToJson.results.filter(
      result => result.wrapperType === "track"
    );
    return onlySongs;
  } catch (error) {
    console.log(error);
  }
};

export default fetchFromItunes;
