import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

export async function openDatabase(
  pathToDatabaseFile: string,
): Promise<SQLite.SQLiteDatabase> {
  if (
    !(await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
    );
  }
  const asset = await Asset.fromModule(
    require(pathToDatabaseFile),
  ).downloadAsync();
  await FileSystem.copyAsync({
    from: asset.localUri,
    to: `${FileSystem.documentDirectory}SQLite/hevy.db`,
  });
  return SQLite.openDatabase("hevy.db");
}
