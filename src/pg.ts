import { Pool } from 'pg';

const createConvertCurrencyFunction = async (pool: Pool) => {
  const query = `
    CREATE OR REPLACE FUNCTION public.convert_currency(
      currency_from varchar,
      currency_to varchar,
      amount float8
    )
    RETURNS float8
    LANGUAGE plpgsql
    AS $function$
    declare 
      factor_from float8 := public."Currencies"."exchangeFactor" 
        from public."Currencies" 
        where code = currency_from;
      factor_to float8 := public."Currencies"."exchangeFactor" 
        from public."Currencies" 
        where code = currency_to;
    begin
      if currency_from = 'USD' then
        return amount / factor_to;
          elseif currency_to = 'USD' then 
        return amount * factor_from;
      else
        return amount * factor_from / factor_to;
      end if;
    end; $function$
  `;

  await pool.query(query);
};

const createCalcUserBalanceFunction = async (pool: Pool) => {
  const query = `
    CREATE OR REPLACE FUNCTION public.calc_user_balance(
      userid integer,
      currency varchar
    )
    RETURNS float8
    LANGUAGE plpgsql
    AS $function$
    begin
      return (
        select sum(convert_currency(currencies.code, currency, balance)) as "Balance"
          from public."Accounts" as accounts
        inner join "Currencies" as currencies
          on currencies.id = accounts."currencyId"
        where accounts."userId" = userid
      );
    end; $function$
  `;

  await pool.query(query);
};

const createFunctions = async () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'CourseProject',
    password: '12345678',
    port: 5432,
  });

  await createConvertCurrencyFunction(pool);
  await createCalcUserBalanceFunction(pool);

  await pool.end();
};

// Functions
const calcUserBalanceQuery = (userId: number, currencyCode: string) =>
  `select calc_user_balance(${userId}, '${currencyCode}');`;

export { createFunctions, calcUserBalanceQuery };
