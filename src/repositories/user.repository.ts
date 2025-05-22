import db from "../config/db";

class UserRepository {
  createUser = async (username: string, hashedPassword: string) => {
    const query = ` insert into "SE".table_temp_chayanon(username, password)
                values('${username}','${hashedPassword}')
                returning id, username, create_date
`;
    const result = await db.query(query);
    return result.rows[0];
  };

  findUserByUsername = async (username: string) => {
    const query = ` select id, username, password
                from "SE".table_temp_chayanon
                where username = '${username}'
`;
    const result = await db.query(query);
    return result.rows[0];
  };

  loginUser = async (username: string) => {
    const query = ` select id, username, password
                from "SE".table_temp_chayanon
                where username = '${username}'
`;

    const result = await db.query(query);
    if (result.rows.length === 0) {
      throw new Error("Invalid username or password");
    }
    return result.rows[0];
  };
}

export default new UserRepository();
