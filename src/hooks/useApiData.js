import axios from "axios";
import { useEffect, useState } from "react";

export default function useApiData(apiUrl, token) {
  const [dataArr, setDataArr] = useState([]);
  const [apiError, setApiError] = useState({});

  useEffect(() => {
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response ===", response);
        const data = response.data;
        setDataArr(data);
      })
      .catch((error) => {
        console.log("error ===", error);
        setApiError(error);
      });
  }, []);

  return [dataArr, setDataArr, apiError];
}
