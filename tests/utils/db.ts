import oracledb from 'oracledb';

let pool: oracledb.Pool | undefined;

async function getPool(): Promise<oracledb.Pool> {
  if (!pool) {
    const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;
    const missing = Object.entries({ DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS })
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missing.length > 0) {
      throw new Error(`Missing Oracle DB configuration: ${missing.join(', ')}`);
    }

    const port = Number(DB_PORT);
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error('DB_PORT must be a valid TCP port number');
    }

    pool = await oracledb.createPool({
      user: DB_USER,
      password: DB_PASS,
      connectString: `${DB_HOST}:${port}/${DB_NAME}`,
      poolMin: 1,
      poolMax: 3,
      poolIncrement: 1,
    });
  }
  return pool;
}

export async function query<T = unknown>(
  sql: string,
  params: oracledb.BindParameters = {},
): Promise<T[]> {
  const connection = await (await getPool()).getConnection();
  try {
    const result = await connection.execute<T>(sql, params, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return result.rows ?? [];
  } finally {
    await connection.close();
  }
}

export async function closeDb() {
  if (pool) {
    const currentPool = pool;
    pool = undefined;
    await currentPool.close(0);
  }
}

