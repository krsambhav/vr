// Function to generate a random number between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to check if the current minute falls within the specified ranges
function isExcludedMinute() {
  const currentMinute = new Date().getMinutes();
  return (
    (currentMinute >= 29 && currentMinute <= 33) || // Excludes minutes 29 to 32
    (currentMinute >= 0 && currentMinute <= 3) // Excludes minutes 0 to 2
  );
}

// Function to refresh the page after a random interval
function refreshPage() {
  // Generate a random value between 180 to 200 seconds
  const randomInterval = getRandomInt(1, 3);

  // Check if the current minute is excluded
  setInterval(() => {
    if (!isExcludedMinute()) {
      console.log(`Refreshing page in ${randomInterval} seconds...`);
      setTimeout(() => {
        chrome.tabs.query(
          { url: "https://www.usvisascheduling.com/en-US/applications/*" },
          (tabs) => {
            if (tabs.length > 0) {
              chrome.tabs.reload(tabs[0].id);
            }
          }
        );
      });
    } else {
      console.log("Skipping refresh due to excluded minute range.");
    }
  }, getRandomInt(150, 200) * 1000);
}

// Initial page refresh
refreshPage();
