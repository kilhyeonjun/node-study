const pool = require('../module/db/pool')

module.exports = {
    find : async() => {
        const [result, _] = await pool.query('select * from users');
        /*
        // 트랜잭션 기법
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction(); // 트랜잭션 적용 시작
            const result = await conn.query('select * from users');
            await conn.commit();
            return result;
        } catch (error) {
            console.log(error);
            await conn.rollback();
            return;
        } finally {
            conn.release();
        }
        */
        return result;
    },
    findByEmail : async(user) => {
        const [result, _] = await pool.query('select * from users where email = ?', [user.email]);
        return result[0];
    },

    save : async(user) => {
        try {
            const [result, _] = await pool.query('insert into users (email, password, name) values (?, ?, ?)', [user.email, user.password, user.name]);
            return result;
        } catch (error) {
            console.log(error);
            return;
        }
    },
}