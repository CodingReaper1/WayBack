import toast from "react-hot-toast";

export async function findUserLocationApi() {
  try {
    const API_KEY = "ssGNZC5IbgxtDkW74wIeo9xuA1kk_HpDlHZLBtOHj_4";

    // const response = await fetch(
    //   `https://geolocation.ls.hereapi.com/2/locate?apiKey=${API_KEY}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   },
    // );

    const response = await fetch(
      `http://api.ipapi.com/api/check?access_key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // console.log("Location data:", data);
    return data;
  } catch (err) {
    const error = err as Error;
    toast.error(error.message);
    return [42.05337156043361, 43.73107910156251];
  }
}
// export async function findUserLocationApi() {
//   const apiKey = "ssGNZC5IbgxtDkW74wIeo9xuA1kk_HpDlHZLBtOHj_4";

//   fetch(`https://positioning.ls.hereapi.com/v2/positioning?apikey=${apiKey}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       // Extract location from `data`
//     })
//     .catch((error) => console.error("Error:", error));

//   return {};
// }
// export async function findUserLocationApi() {
//   const apiKey = "ssGNZC5IbgxtDkW74wIeo9xuA1kk_HpDlHZLBtOHj_4";

//   try {
//     const response = await fetch(
//       `https://positioning.ls.hereapi.com/v2/positioning?apikey=${apiKey}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);
//     // Extract location from `data`
//     return data;
//   } catch (error) {
//     console.error("Error:", error);
//     return {};
//   }
// }
