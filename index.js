import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import globalHook from "use-global-hook";

const useGlobalState = globalHook(
  React,
  { files: {} },
  {
    setFile: (store, file) => {
      store.setState({
        files: Object.assign(store.files, { [file.name]: file.contents }),
      });
    },
  }
);

function useFile(fileName) {
  const [globalState, globalActions] = useGlobalState(),
    fileContents = (globalState[fileName] || {}).contents,
    setFileContents = (contents) =>
      globalActions.setFile({ name: fileName, contents });

  function load() {
    return new Promise((resolve, reject) => {
      FileSystem.readAsStringAsync(fileName)
        .then((contents) => {
          setFileContents(contents);
          resolve(contents);
        })
        .catch(() => {
          setFileContents(null);
          reject();
        });
    });
  }

  function write(newContents) {
    return new Promise((resolve, reject) => {
      FileSystem.writeAsStringAsync(fileName, newContents)
        .then(() => {
          setFileContents(newContents);
          resolve(newContents);
        })
        .catch(reject);
    });
  }

  useEffect(() => {
    if (fileContents === null) {
      load();
    }
  }, []);

  return [fileContents, load, write];
}

function useJSONFile(fileName) {
  const [json, load, write] = useFile(fileName);

  function loadJSON() {
    return new Promise((resolve, reject) => {
      load()
        .then((json) => resolve(JSON.parse(json)))
        .catch(reject);
    });
  }

  function writeJSON(data) {
    return new Promise((resolve, reject) => {
      write(JSON.stringify(data)).then(resolve).catch(reject);
    });
  }

  return [JSON.parse(json), loadJSON, writeJSON];
}

export { useFile, useJSONFile };
