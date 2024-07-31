import React from "react";

export const logHelper = (metotName, actionOrInfo, stateConditionOrInfo, value) => {
  const logType = typeof value === "string" ? true : false;
  if (process.env.NODE_ENV !== "production") {
    console.log(
      " <| Metot: '",
      String(metotName)+" '",
      " | Action Or Info: '",
      String(actionOrInfo)+" '",
      " | State Condition Or Info: '",
      String(stateConditionOrInfo)+" '",
      " | Data Value: '",
      logType ? String(value) : JSON.stringify(value), " ' |> "
    );
  }
};
