import { Pool } from 'pg';

// Functions

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

const createGetAccountTransactionsSumFunction = async (pool: Pool) => {
  const query = `
    CREATE OR REPLACE FUNCTION public.get_account_transactions_sum(account_id integer)
    RETURNS double precision
    LANGUAGE plpgsql
    AS $function$
    declare 
      total float8 := SUM(
            case
            WHEN "Transactions"."typeId" = 1 THEN -1 * amount
            WHEN "Transactions"."typeId" = 2 THEN  amount 
            ELSE 0
          end
        ) as total
        from "Transactions"
        where "accountId" = account_id;
      begin
        if total is null then 
          return 0;
        else
          return total;
        end if;
      END;
    $function$
    ;
  `;

  await pool.query(query);
};

const updateAccountsFunction = async (pool: Pool) => {
  const query = `
    CREATE OR REPLACE FUNCTION public.update_accounts()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $function$
      begin
        update "Accounts" set balance = get_account_transactions_sum(id);
        return null;
      END;
    $function$
    ;
  `;

  await pool.query(query);
};

const calcUserBalanceQuery = (userId: number, currencyCode: string) =>
  `select calc_user_balance(${userId}, '${currencyCode}');`;

// Triggers

const createAfterTransactionDeleteTrigger = async (pool: Pool) => {
  const query = `
    DROP TRIGGER IF EXISTS after_transaction_delete ON public."Transactions";

    create trigger after_transaction_delete after
    delete
        on
        public."Transactions" for each statement execute function update_accounts();
  `;

  await pool.query(query);
};

const createAfterTransactionUpdateTrigger = async (pool: Pool) => {
  const query = `
    DROP TRIGGER IF EXISTS after_transaction_update ON public."Transactions";

    create trigger after_transaction_update after
    update
        on
        public."Transactions" for each statement execute function update_accounts();
  `;

  await pool.query(query);
};

const createAfterTransactionInsertTrigger = async (pool: Pool) => {
  const query = `
    DROP TRIGGER IF EXISTS after_transaction_insert ON public."Transactions";

    create trigger after_transaction_insert after
    insert
        on
        public."Transactions" for each statement execute function update_accounts();
  `;

  await pool.query(query);
};

// Init

const init = async () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'CourseProject',
    password: '12345678',
    port: 5432,
  });

  await createConvertCurrencyFunction(pool);
  await createCalcUserBalanceFunction(pool);
  await createGetAccountTransactionsSumFunction(pool);
  await updateAccountsFunction(pool);

  await createAfterTransactionInsertTrigger(pool);
  await createAfterTransactionDeleteTrigger(pool);
  await createAfterTransactionUpdateTrigger(pool);

  await pool.end();
};

export { init, calcUserBalanceQuery };
