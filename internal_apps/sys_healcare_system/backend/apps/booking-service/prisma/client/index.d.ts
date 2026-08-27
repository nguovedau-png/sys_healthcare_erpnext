
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model LabTest
 * 
 */
export type LabTest = $Result.DefaultSelection<Prisma.$LabTestPayload>
/**
 * Model PharmacyOrder
 * 
 */
export type PharmacyOrder = $Result.DefaultSelection<Prisma.$PharmacyOrderPayload>
/**
 * Model RefundRequest
 * 
 */
export type RefundRequest = $Result.DefaultSelection<Prisma.$RefundRequestPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Appointments
 * const appointments = await prisma.appointment.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Appointments
   * const appointments = await prisma.appointment.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs>;

  /**
   * `prisma.labTest`: Exposes CRUD operations for the **LabTest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LabTests
    * const labTests = await prisma.labTest.findMany()
    * ```
    */
  get labTest(): Prisma.LabTestDelegate<ExtArgs>;

  /**
   * `prisma.pharmacyOrder`: Exposes CRUD operations for the **PharmacyOrder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PharmacyOrders
    * const pharmacyOrders = await prisma.pharmacyOrder.findMany()
    * ```
    */
  get pharmacyOrder(): Prisma.PharmacyOrderDelegate<ExtArgs>;

  /**
   * `prisma.refundRequest`: Exposes CRUD operations for the **RefundRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefundRequests
    * const refundRequests = await prisma.refundRequest.findMany()
    * ```
    */
  get refundRequest(): Prisma.RefundRequestDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Appointment: 'Appointment',
    LabTest: 'LabTest',
    PharmacyOrder: 'PharmacyOrder',
    RefundRequest: 'RefundRequest'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "appointment" | "labTest" | "pharmacyOrder" | "refundRequest"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      LabTest: {
        payload: Prisma.$LabTestPayload<ExtArgs>
        fields: Prisma.LabTestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LabTestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabTestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LabTestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabTestPayload>
          }
          findFirst: {
            args: Prisma.LabTestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabTestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LabTestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabTestPayload>
          }
          findMany: {
            args: Prisma.LabTestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabTestPayload>[]
          }
          create: {
            args: Prisma.LabTestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabTestPayload>
          }
          createMany: {
            args: Prisma.LabTestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LabTestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabTestPayload>[]
          }
          delete: {
            args: Prisma.LabTestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabTestPayload>
          }
          update: {
            args: Prisma.LabTestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabTestPayload>
          }
          deleteMany: {
            args: Prisma.LabTestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LabTestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LabTestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabTestPayload>
          }
          aggregate: {
            args: Prisma.LabTestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLabTest>
          }
          groupBy: {
            args: Prisma.LabTestGroupByArgs<ExtArgs>
            result: $Utils.Optional<LabTestGroupByOutputType>[]
          }
          count: {
            args: Prisma.LabTestCountArgs<ExtArgs>
            result: $Utils.Optional<LabTestCountAggregateOutputType> | number
          }
        }
      }
      PharmacyOrder: {
        payload: Prisma.$PharmacyOrderPayload<ExtArgs>
        fields: Prisma.PharmacyOrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PharmacyOrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyOrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PharmacyOrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyOrderPayload>
          }
          findFirst: {
            args: Prisma.PharmacyOrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyOrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PharmacyOrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyOrderPayload>
          }
          findMany: {
            args: Prisma.PharmacyOrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyOrderPayload>[]
          }
          create: {
            args: Prisma.PharmacyOrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyOrderPayload>
          }
          createMany: {
            args: Prisma.PharmacyOrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PharmacyOrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyOrderPayload>[]
          }
          delete: {
            args: Prisma.PharmacyOrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyOrderPayload>
          }
          update: {
            args: Prisma.PharmacyOrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyOrderPayload>
          }
          deleteMany: {
            args: Prisma.PharmacyOrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PharmacyOrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PharmacyOrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PharmacyOrderPayload>
          }
          aggregate: {
            args: Prisma.PharmacyOrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePharmacyOrder>
          }
          groupBy: {
            args: Prisma.PharmacyOrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<PharmacyOrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.PharmacyOrderCountArgs<ExtArgs>
            result: $Utils.Optional<PharmacyOrderCountAggregateOutputType> | number
          }
        }
      }
      RefundRequest: {
        payload: Prisma.$RefundRequestPayload<ExtArgs>
        fields: Prisma.RefundRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefundRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefundRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          findFirst: {
            args: Prisma.RefundRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefundRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          findMany: {
            args: Prisma.RefundRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>[]
          }
          create: {
            args: Prisma.RefundRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          createMany: {
            args: Prisma.RefundRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefundRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>[]
          }
          delete: {
            args: Prisma.RefundRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          update: {
            args: Prisma.RefundRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          deleteMany: {
            args: Prisma.RefundRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefundRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RefundRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefundRequestPayload>
          }
          aggregate: {
            args: Prisma.RefundRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefundRequest>
          }
          groupBy: {
            args: Prisma.RefundRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefundRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefundRequestCountArgs<ExtArgs>
            result: $Utils.Optional<RefundRequestCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentAvgAggregateOutputType = {
    id: number | null
  }

  export type AppointmentSumAggregateOutputType = {
    id: number | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: number | null
    patientId: string | null
    patientName: string | null
    patientPhone: string | null
    doctorId: string | null
    doctorName: string | null
    date: string | null
    time: string | null
    service: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: number | null
    patientId: string | null
    patientName: string | null
    patientPhone: string | null
    doctorId: string | null
    doctorName: string | null
    date: string | null
    time: string | null
    service: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    patientId: number
    patientName: number
    patientPhone: number
    doctorId: number
    doctorName: number
    date: number
    time: number
    service: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentAvgAggregateInputType = {
    id?: true
  }

  export type AppointmentSumAggregateInputType = {
    id?: true
  }

  export type AppointmentMinAggregateInputType = {
    id?: true
    patientId?: true
    patientName?: true
    patientPhone?: true
    doctorId?: true
    doctorName?: true
    date?: true
    time?: true
    service?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    patientId?: true
    patientName?: true
    patientPhone?: true
    doctorId?: true
    doctorName?: true
    date?: true
    time?: true
    service?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    patientId?: true
    patientName?: true
    patientPhone?: true
    doctorId?: true
    doctorName?: true
    date?: true
    time?: true
    service?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _avg?: AppointmentAvgAggregateInputType
    _sum?: AppointmentSumAggregateInputType
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: number
    patientId: string
    patientName: string
    patientPhone: string
    doctorId: string
    doctorName: string
    date: string
    time: string
    service: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    patientName?: boolean
    patientPhone?: boolean
    doctorId?: boolean
    doctorName?: boolean
    date?: boolean
    time?: boolean
    service?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    patientName?: boolean
    patientPhone?: boolean
    doctorId?: boolean
    doctorName?: boolean
    date?: boolean
    time?: boolean
    service?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    patientId?: boolean
    patientName?: boolean
    patientPhone?: boolean
    doctorId?: boolean
    doctorName?: boolean
    date?: boolean
    time?: boolean
    service?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      patientId: string
      patientName: string
      patientPhone: string
      doctorId: string
      doctorName: string
      date: string
      time: string
      service: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */ 
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'Int'>
    readonly patientId: FieldRef<"Appointment", 'String'>
    readonly patientName: FieldRef<"Appointment", 'String'>
    readonly patientPhone: FieldRef<"Appointment", 'String'>
    readonly doctorId: FieldRef<"Appointment", 'String'>
    readonly doctorName: FieldRef<"Appointment", 'String'>
    readonly date: FieldRef<"Appointment", 'String'>
    readonly time: FieldRef<"Appointment", 'String'>
    readonly service: FieldRef<"Appointment", 'String'>
    readonly status: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
  }


  /**
   * Model LabTest
   */

  export type AggregateLabTest = {
    _count: LabTestCountAggregateOutputType | null
    _avg: LabTestAvgAggregateOutputType | null
    _sum: LabTestSumAggregateOutputType | null
    _min: LabTestMinAggregateOutputType | null
    _max: LabTestMaxAggregateOutputType | null
  }

  export type LabTestAvgAggregateOutputType = {
    id: number | null
    fee: number | null
  }

  export type LabTestSumAggregateOutputType = {
    id: number | null
    fee: number | null
  }

  export type LabTestMinAggregateOutputType = {
    id: number | null
    orderCode: string | null
    patientId: string | null
    patientName: string | null
    patientPhone: string | null
    testType: string | null
    hospital: string | null
    fee: number | null
    testDate: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LabTestMaxAggregateOutputType = {
    id: number | null
    orderCode: string | null
    patientId: string | null
    patientName: string | null
    patientPhone: string | null
    testType: string | null
    hospital: string | null
    fee: number | null
    testDate: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LabTestCountAggregateOutputType = {
    id: number
    orderCode: number
    patientId: number
    patientName: number
    patientPhone: number
    testType: number
    hospital: number
    fee: number
    testDate: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LabTestAvgAggregateInputType = {
    id?: true
    fee?: true
  }

  export type LabTestSumAggregateInputType = {
    id?: true
    fee?: true
  }

  export type LabTestMinAggregateInputType = {
    id?: true
    orderCode?: true
    patientId?: true
    patientName?: true
    patientPhone?: true
    testType?: true
    hospital?: true
    fee?: true
    testDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LabTestMaxAggregateInputType = {
    id?: true
    orderCode?: true
    patientId?: true
    patientName?: true
    patientPhone?: true
    testType?: true
    hospital?: true
    fee?: true
    testDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LabTestCountAggregateInputType = {
    id?: true
    orderCode?: true
    patientId?: true
    patientName?: true
    patientPhone?: true
    testType?: true
    hospital?: true
    fee?: true
    testDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LabTestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LabTest to aggregate.
     */
    where?: LabTestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LabTests to fetch.
     */
    orderBy?: LabTestOrderByWithRelationInput | LabTestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LabTestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LabTests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LabTests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LabTests
    **/
    _count?: true | LabTestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LabTestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LabTestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LabTestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LabTestMaxAggregateInputType
  }

  export type GetLabTestAggregateType<T extends LabTestAggregateArgs> = {
        [P in keyof T & keyof AggregateLabTest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLabTest[P]>
      : GetScalarType<T[P], AggregateLabTest[P]>
  }




  export type LabTestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LabTestWhereInput
    orderBy?: LabTestOrderByWithAggregationInput | LabTestOrderByWithAggregationInput[]
    by: LabTestScalarFieldEnum[] | LabTestScalarFieldEnum
    having?: LabTestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LabTestCountAggregateInputType | true
    _avg?: LabTestAvgAggregateInputType
    _sum?: LabTestSumAggregateInputType
    _min?: LabTestMinAggregateInputType
    _max?: LabTestMaxAggregateInputType
  }

  export type LabTestGroupByOutputType = {
    id: number
    orderCode: string
    patientId: string
    patientName: string
    patientPhone: string
    testType: string
    hospital: string
    fee: number
    testDate: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: LabTestCountAggregateOutputType | null
    _avg: LabTestAvgAggregateOutputType | null
    _sum: LabTestSumAggregateOutputType | null
    _min: LabTestMinAggregateOutputType | null
    _max: LabTestMaxAggregateOutputType | null
  }

  type GetLabTestGroupByPayload<T extends LabTestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LabTestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LabTestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LabTestGroupByOutputType[P]>
            : GetScalarType<T[P], LabTestGroupByOutputType[P]>
        }
      >
    >


  export type LabTestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderCode?: boolean
    patientId?: boolean
    patientName?: boolean
    patientPhone?: boolean
    testType?: boolean
    hospital?: boolean
    fee?: boolean
    testDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["labTest"]>

  export type LabTestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderCode?: boolean
    patientId?: boolean
    patientName?: boolean
    patientPhone?: boolean
    testType?: boolean
    hospital?: boolean
    fee?: boolean
    testDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["labTest"]>

  export type LabTestSelectScalar = {
    id?: boolean
    orderCode?: boolean
    patientId?: boolean
    patientName?: boolean
    patientPhone?: boolean
    testType?: boolean
    hospital?: boolean
    fee?: boolean
    testDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $LabTestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LabTest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderCode: string
      patientId: string
      patientName: string
      patientPhone: string
      testType: string
      hospital: string
      fee: number
      testDate: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["labTest"]>
    composites: {}
  }

  type LabTestGetPayload<S extends boolean | null | undefined | LabTestDefaultArgs> = $Result.GetResult<Prisma.$LabTestPayload, S>

  type LabTestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LabTestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LabTestCountAggregateInputType | true
    }

  export interface LabTestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LabTest'], meta: { name: 'LabTest' } }
    /**
     * Find zero or one LabTest that matches the filter.
     * @param {LabTestFindUniqueArgs} args - Arguments to find a LabTest
     * @example
     * // Get one LabTest
     * const labTest = await prisma.labTest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LabTestFindUniqueArgs>(args: SelectSubset<T, LabTestFindUniqueArgs<ExtArgs>>): Prisma__LabTestClient<$Result.GetResult<Prisma.$LabTestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LabTest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LabTestFindUniqueOrThrowArgs} args - Arguments to find a LabTest
     * @example
     * // Get one LabTest
     * const labTest = await prisma.labTest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LabTestFindUniqueOrThrowArgs>(args: SelectSubset<T, LabTestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LabTestClient<$Result.GetResult<Prisma.$LabTestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LabTest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabTestFindFirstArgs} args - Arguments to find a LabTest
     * @example
     * // Get one LabTest
     * const labTest = await prisma.labTest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LabTestFindFirstArgs>(args?: SelectSubset<T, LabTestFindFirstArgs<ExtArgs>>): Prisma__LabTestClient<$Result.GetResult<Prisma.$LabTestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LabTest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabTestFindFirstOrThrowArgs} args - Arguments to find a LabTest
     * @example
     * // Get one LabTest
     * const labTest = await prisma.labTest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LabTestFindFirstOrThrowArgs>(args?: SelectSubset<T, LabTestFindFirstOrThrowArgs<ExtArgs>>): Prisma__LabTestClient<$Result.GetResult<Prisma.$LabTestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LabTests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabTestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LabTests
     * const labTests = await prisma.labTest.findMany()
     * 
     * // Get first 10 LabTests
     * const labTests = await prisma.labTest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const labTestWithIdOnly = await prisma.labTest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LabTestFindManyArgs>(args?: SelectSubset<T, LabTestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabTestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LabTest.
     * @param {LabTestCreateArgs} args - Arguments to create a LabTest.
     * @example
     * // Create one LabTest
     * const LabTest = await prisma.labTest.create({
     *   data: {
     *     // ... data to create a LabTest
     *   }
     * })
     * 
     */
    create<T extends LabTestCreateArgs>(args: SelectSubset<T, LabTestCreateArgs<ExtArgs>>): Prisma__LabTestClient<$Result.GetResult<Prisma.$LabTestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LabTests.
     * @param {LabTestCreateManyArgs} args - Arguments to create many LabTests.
     * @example
     * // Create many LabTests
     * const labTest = await prisma.labTest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LabTestCreateManyArgs>(args?: SelectSubset<T, LabTestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LabTests and returns the data saved in the database.
     * @param {LabTestCreateManyAndReturnArgs} args - Arguments to create many LabTests.
     * @example
     * // Create many LabTests
     * const labTest = await prisma.labTest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LabTests and only return the `id`
     * const labTestWithIdOnly = await prisma.labTest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LabTestCreateManyAndReturnArgs>(args?: SelectSubset<T, LabTestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabTestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LabTest.
     * @param {LabTestDeleteArgs} args - Arguments to delete one LabTest.
     * @example
     * // Delete one LabTest
     * const LabTest = await prisma.labTest.delete({
     *   where: {
     *     // ... filter to delete one LabTest
     *   }
     * })
     * 
     */
    delete<T extends LabTestDeleteArgs>(args: SelectSubset<T, LabTestDeleteArgs<ExtArgs>>): Prisma__LabTestClient<$Result.GetResult<Prisma.$LabTestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LabTest.
     * @param {LabTestUpdateArgs} args - Arguments to update one LabTest.
     * @example
     * // Update one LabTest
     * const labTest = await prisma.labTest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LabTestUpdateArgs>(args: SelectSubset<T, LabTestUpdateArgs<ExtArgs>>): Prisma__LabTestClient<$Result.GetResult<Prisma.$LabTestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LabTests.
     * @param {LabTestDeleteManyArgs} args - Arguments to filter LabTests to delete.
     * @example
     * // Delete a few LabTests
     * const { count } = await prisma.labTest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LabTestDeleteManyArgs>(args?: SelectSubset<T, LabTestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LabTests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabTestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LabTests
     * const labTest = await prisma.labTest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LabTestUpdateManyArgs>(args: SelectSubset<T, LabTestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LabTest.
     * @param {LabTestUpsertArgs} args - Arguments to update or create a LabTest.
     * @example
     * // Update or create a LabTest
     * const labTest = await prisma.labTest.upsert({
     *   create: {
     *     // ... data to create a LabTest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LabTest we want to update
     *   }
     * })
     */
    upsert<T extends LabTestUpsertArgs>(args: SelectSubset<T, LabTestUpsertArgs<ExtArgs>>): Prisma__LabTestClient<$Result.GetResult<Prisma.$LabTestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LabTests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabTestCountArgs} args - Arguments to filter LabTests to count.
     * @example
     * // Count the number of LabTests
     * const count = await prisma.labTest.count({
     *   where: {
     *     // ... the filter for the LabTests we want to count
     *   }
     * })
    **/
    count<T extends LabTestCountArgs>(
      args?: Subset<T, LabTestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LabTestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LabTest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabTestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LabTestAggregateArgs>(args: Subset<T, LabTestAggregateArgs>): Prisma.PrismaPromise<GetLabTestAggregateType<T>>

    /**
     * Group by LabTest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabTestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LabTestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LabTestGroupByArgs['orderBy'] }
        : { orderBy?: LabTestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LabTestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLabTestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LabTest model
   */
  readonly fields: LabTestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LabTest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LabTestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LabTest model
   */ 
  interface LabTestFieldRefs {
    readonly id: FieldRef<"LabTest", 'Int'>
    readonly orderCode: FieldRef<"LabTest", 'String'>
    readonly patientId: FieldRef<"LabTest", 'String'>
    readonly patientName: FieldRef<"LabTest", 'String'>
    readonly patientPhone: FieldRef<"LabTest", 'String'>
    readonly testType: FieldRef<"LabTest", 'String'>
    readonly hospital: FieldRef<"LabTest", 'String'>
    readonly fee: FieldRef<"LabTest", 'Float'>
    readonly testDate: FieldRef<"LabTest", 'String'>
    readonly status: FieldRef<"LabTest", 'String'>
    readonly createdAt: FieldRef<"LabTest", 'DateTime'>
    readonly updatedAt: FieldRef<"LabTest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LabTest findUnique
   */
  export type LabTestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabTest
     */
    select?: LabTestSelect<ExtArgs> | null
    /**
     * Filter, which LabTest to fetch.
     */
    where: LabTestWhereUniqueInput
  }

  /**
   * LabTest findUniqueOrThrow
   */
  export type LabTestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabTest
     */
    select?: LabTestSelect<ExtArgs> | null
    /**
     * Filter, which LabTest to fetch.
     */
    where: LabTestWhereUniqueInput
  }

  /**
   * LabTest findFirst
   */
  export type LabTestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabTest
     */
    select?: LabTestSelect<ExtArgs> | null
    /**
     * Filter, which LabTest to fetch.
     */
    where?: LabTestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LabTests to fetch.
     */
    orderBy?: LabTestOrderByWithRelationInput | LabTestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LabTests.
     */
    cursor?: LabTestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LabTests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LabTests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LabTests.
     */
    distinct?: LabTestScalarFieldEnum | LabTestScalarFieldEnum[]
  }

  /**
   * LabTest findFirstOrThrow
   */
  export type LabTestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabTest
     */
    select?: LabTestSelect<ExtArgs> | null
    /**
     * Filter, which LabTest to fetch.
     */
    where?: LabTestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LabTests to fetch.
     */
    orderBy?: LabTestOrderByWithRelationInput | LabTestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LabTests.
     */
    cursor?: LabTestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LabTests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LabTests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LabTests.
     */
    distinct?: LabTestScalarFieldEnum | LabTestScalarFieldEnum[]
  }

  /**
   * LabTest findMany
   */
  export type LabTestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabTest
     */
    select?: LabTestSelect<ExtArgs> | null
    /**
     * Filter, which LabTests to fetch.
     */
    where?: LabTestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LabTests to fetch.
     */
    orderBy?: LabTestOrderByWithRelationInput | LabTestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LabTests.
     */
    cursor?: LabTestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LabTests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LabTests.
     */
    skip?: number
    distinct?: LabTestScalarFieldEnum | LabTestScalarFieldEnum[]
  }

  /**
   * LabTest create
   */
  export type LabTestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabTest
     */
    select?: LabTestSelect<ExtArgs> | null
    /**
     * The data needed to create a LabTest.
     */
    data: XOR<LabTestCreateInput, LabTestUncheckedCreateInput>
  }

  /**
   * LabTest createMany
   */
  export type LabTestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LabTests.
     */
    data: LabTestCreateManyInput | LabTestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LabTest createManyAndReturn
   */
  export type LabTestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabTest
     */
    select?: LabTestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LabTests.
     */
    data: LabTestCreateManyInput | LabTestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LabTest update
   */
  export type LabTestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabTest
     */
    select?: LabTestSelect<ExtArgs> | null
    /**
     * The data needed to update a LabTest.
     */
    data: XOR<LabTestUpdateInput, LabTestUncheckedUpdateInput>
    /**
     * Choose, which LabTest to update.
     */
    where: LabTestWhereUniqueInput
  }

  /**
   * LabTest updateMany
   */
  export type LabTestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LabTests.
     */
    data: XOR<LabTestUpdateManyMutationInput, LabTestUncheckedUpdateManyInput>
    /**
     * Filter which LabTests to update
     */
    where?: LabTestWhereInput
  }

  /**
   * LabTest upsert
   */
  export type LabTestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabTest
     */
    select?: LabTestSelect<ExtArgs> | null
    /**
     * The filter to search for the LabTest to update in case it exists.
     */
    where: LabTestWhereUniqueInput
    /**
     * In case the LabTest found by the `where` argument doesn't exist, create a new LabTest with this data.
     */
    create: XOR<LabTestCreateInput, LabTestUncheckedCreateInput>
    /**
     * In case the LabTest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LabTestUpdateInput, LabTestUncheckedUpdateInput>
  }

  /**
   * LabTest delete
   */
  export type LabTestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabTest
     */
    select?: LabTestSelect<ExtArgs> | null
    /**
     * Filter which LabTest to delete.
     */
    where: LabTestWhereUniqueInput
  }

  /**
   * LabTest deleteMany
   */
  export type LabTestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LabTests to delete
     */
    where?: LabTestWhereInput
  }

  /**
   * LabTest without action
   */
  export type LabTestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabTest
     */
    select?: LabTestSelect<ExtArgs> | null
  }


  /**
   * Model PharmacyOrder
   */

  export type AggregatePharmacyOrder = {
    _count: PharmacyOrderCountAggregateOutputType | null
    _avg: PharmacyOrderAvgAggregateOutputType | null
    _sum: PharmacyOrderSumAggregateOutputType | null
    _min: PharmacyOrderMinAggregateOutputType | null
    _max: PharmacyOrderMaxAggregateOutputType | null
  }

  export type PharmacyOrderAvgAggregateOutputType = {
    id: number | null
    itemsCount: number | null
    totalAmount: number | null
  }

  export type PharmacyOrderSumAggregateOutputType = {
    id: number | null
    itemsCount: number | null
    totalAmount: number | null
  }

  export type PharmacyOrderMinAggregateOutputType = {
    id: number | null
    code: string | null
    customerId: string | null
    customerName: string | null
    customerPhone: string | null
    pharmacy: string | null
    itemsCount: number | null
    totalAmount: number | null
    date: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PharmacyOrderMaxAggregateOutputType = {
    id: number | null
    code: string | null
    customerId: string | null
    customerName: string | null
    customerPhone: string | null
    pharmacy: string | null
    itemsCount: number | null
    totalAmount: number | null
    date: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PharmacyOrderCountAggregateOutputType = {
    id: number
    code: number
    customerId: number
    customerName: number
    customerPhone: number
    pharmacy: number
    itemsCount: number
    totalAmount: number
    date: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PharmacyOrderAvgAggregateInputType = {
    id?: true
    itemsCount?: true
    totalAmount?: true
  }

  export type PharmacyOrderSumAggregateInputType = {
    id?: true
    itemsCount?: true
    totalAmount?: true
  }

  export type PharmacyOrderMinAggregateInputType = {
    id?: true
    code?: true
    customerId?: true
    customerName?: true
    customerPhone?: true
    pharmacy?: true
    itemsCount?: true
    totalAmount?: true
    date?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PharmacyOrderMaxAggregateInputType = {
    id?: true
    code?: true
    customerId?: true
    customerName?: true
    customerPhone?: true
    pharmacy?: true
    itemsCount?: true
    totalAmount?: true
    date?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PharmacyOrderCountAggregateInputType = {
    id?: true
    code?: true
    customerId?: true
    customerName?: true
    customerPhone?: true
    pharmacy?: true
    itemsCount?: true
    totalAmount?: true
    date?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PharmacyOrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PharmacyOrder to aggregate.
     */
    where?: PharmacyOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PharmacyOrders to fetch.
     */
    orderBy?: PharmacyOrderOrderByWithRelationInput | PharmacyOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PharmacyOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PharmacyOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PharmacyOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PharmacyOrders
    **/
    _count?: true | PharmacyOrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PharmacyOrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PharmacyOrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PharmacyOrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PharmacyOrderMaxAggregateInputType
  }

  export type GetPharmacyOrderAggregateType<T extends PharmacyOrderAggregateArgs> = {
        [P in keyof T & keyof AggregatePharmacyOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePharmacyOrder[P]>
      : GetScalarType<T[P], AggregatePharmacyOrder[P]>
  }




  export type PharmacyOrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PharmacyOrderWhereInput
    orderBy?: PharmacyOrderOrderByWithAggregationInput | PharmacyOrderOrderByWithAggregationInput[]
    by: PharmacyOrderScalarFieldEnum[] | PharmacyOrderScalarFieldEnum
    having?: PharmacyOrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PharmacyOrderCountAggregateInputType | true
    _avg?: PharmacyOrderAvgAggregateInputType
    _sum?: PharmacyOrderSumAggregateInputType
    _min?: PharmacyOrderMinAggregateInputType
    _max?: PharmacyOrderMaxAggregateInputType
  }

  export type PharmacyOrderGroupByOutputType = {
    id: number
    code: string
    customerId: string
    customerName: string
    customerPhone: string
    pharmacy: string
    itemsCount: number
    totalAmount: number
    date: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: PharmacyOrderCountAggregateOutputType | null
    _avg: PharmacyOrderAvgAggregateOutputType | null
    _sum: PharmacyOrderSumAggregateOutputType | null
    _min: PharmacyOrderMinAggregateOutputType | null
    _max: PharmacyOrderMaxAggregateOutputType | null
  }

  type GetPharmacyOrderGroupByPayload<T extends PharmacyOrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PharmacyOrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PharmacyOrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PharmacyOrderGroupByOutputType[P]>
            : GetScalarType<T[P], PharmacyOrderGroupByOutputType[P]>
        }
      >
    >


  export type PharmacyOrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    customerId?: boolean
    customerName?: boolean
    customerPhone?: boolean
    pharmacy?: boolean
    itemsCount?: boolean
    totalAmount?: boolean
    date?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pharmacyOrder"]>

  export type PharmacyOrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    customerId?: boolean
    customerName?: boolean
    customerPhone?: boolean
    pharmacy?: boolean
    itemsCount?: boolean
    totalAmount?: boolean
    date?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pharmacyOrder"]>

  export type PharmacyOrderSelectScalar = {
    id?: boolean
    code?: boolean
    customerId?: boolean
    customerName?: boolean
    customerPhone?: boolean
    pharmacy?: boolean
    itemsCount?: boolean
    totalAmount?: boolean
    date?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $PharmacyOrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PharmacyOrder"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      customerId: string
      customerName: string
      customerPhone: string
      pharmacy: string
      itemsCount: number
      totalAmount: number
      date: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pharmacyOrder"]>
    composites: {}
  }

  type PharmacyOrderGetPayload<S extends boolean | null | undefined | PharmacyOrderDefaultArgs> = $Result.GetResult<Prisma.$PharmacyOrderPayload, S>

  type PharmacyOrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PharmacyOrderFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PharmacyOrderCountAggregateInputType | true
    }

  export interface PharmacyOrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PharmacyOrder'], meta: { name: 'PharmacyOrder' } }
    /**
     * Find zero or one PharmacyOrder that matches the filter.
     * @param {PharmacyOrderFindUniqueArgs} args - Arguments to find a PharmacyOrder
     * @example
     * // Get one PharmacyOrder
     * const pharmacyOrder = await prisma.pharmacyOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PharmacyOrderFindUniqueArgs>(args: SelectSubset<T, PharmacyOrderFindUniqueArgs<ExtArgs>>): Prisma__PharmacyOrderClient<$Result.GetResult<Prisma.$PharmacyOrderPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PharmacyOrder that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PharmacyOrderFindUniqueOrThrowArgs} args - Arguments to find a PharmacyOrder
     * @example
     * // Get one PharmacyOrder
     * const pharmacyOrder = await prisma.pharmacyOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PharmacyOrderFindUniqueOrThrowArgs>(args: SelectSubset<T, PharmacyOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PharmacyOrderClient<$Result.GetResult<Prisma.$PharmacyOrderPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PharmacyOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyOrderFindFirstArgs} args - Arguments to find a PharmacyOrder
     * @example
     * // Get one PharmacyOrder
     * const pharmacyOrder = await prisma.pharmacyOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PharmacyOrderFindFirstArgs>(args?: SelectSubset<T, PharmacyOrderFindFirstArgs<ExtArgs>>): Prisma__PharmacyOrderClient<$Result.GetResult<Prisma.$PharmacyOrderPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PharmacyOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyOrderFindFirstOrThrowArgs} args - Arguments to find a PharmacyOrder
     * @example
     * // Get one PharmacyOrder
     * const pharmacyOrder = await prisma.pharmacyOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PharmacyOrderFindFirstOrThrowArgs>(args?: SelectSubset<T, PharmacyOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__PharmacyOrderClient<$Result.GetResult<Prisma.$PharmacyOrderPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PharmacyOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PharmacyOrders
     * const pharmacyOrders = await prisma.pharmacyOrder.findMany()
     * 
     * // Get first 10 PharmacyOrders
     * const pharmacyOrders = await prisma.pharmacyOrder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pharmacyOrderWithIdOnly = await prisma.pharmacyOrder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PharmacyOrderFindManyArgs>(args?: SelectSubset<T, PharmacyOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PharmacyOrderPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PharmacyOrder.
     * @param {PharmacyOrderCreateArgs} args - Arguments to create a PharmacyOrder.
     * @example
     * // Create one PharmacyOrder
     * const PharmacyOrder = await prisma.pharmacyOrder.create({
     *   data: {
     *     // ... data to create a PharmacyOrder
     *   }
     * })
     * 
     */
    create<T extends PharmacyOrderCreateArgs>(args: SelectSubset<T, PharmacyOrderCreateArgs<ExtArgs>>): Prisma__PharmacyOrderClient<$Result.GetResult<Prisma.$PharmacyOrderPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PharmacyOrders.
     * @param {PharmacyOrderCreateManyArgs} args - Arguments to create many PharmacyOrders.
     * @example
     * // Create many PharmacyOrders
     * const pharmacyOrder = await prisma.pharmacyOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PharmacyOrderCreateManyArgs>(args?: SelectSubset<T, PharmacyOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PharmacyOrders and returns the data saved in the database.
     * @param {PharmacyOrderCreateManyAndReturnArgs} args - Arguments to create many PharmacyOrders.
     * @example
     * // Create many PharmacyOrders
     * const pharmacyOrder = await prisma.pharmacyOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PharmacyOrders and only return the `id`
     * const pharmacyOrderWithIdOnly = await prisma.pharmacyOrder.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PharmacyOrderCreateManyAndReturnArgs>(args?: SelectSubset<T, PharmacyOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PharmacyOrderPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PharmacyOrder.
     * @param {PharmacyOrderDeleteArgs} args - Arguments to delete one PharmacyOrder.
     * @example
     * // Delete one PharmacyOrder
     * const PharmacyOrder = await prisma.pharmacyOrder.delete({
     *   where: {
     *     // ... filter to delete one PharmacyOrder
     *   }
     * })
     * 
     */
    delete<T extends PharmacyOrderDeleteArgs>(args: SelectSubset<T, PharmacyOrderDeleteArgs<ExtArgs>>): Prisma__PharmacyOrderClient<$Result.GetResult<Prisma.$PharmacyOrderPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PharmacyOrder.
     * @param {PharmacyOrderUpdateArgs} args - Arguments to update one PharmacyOrder.
     * @example
     * // Update one PharmacyOrder
     * const pharmacyOrder = await prisma.pharmacyOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PharmacyOrderUpdateArgs>(args: SelectSubset<T, PharmacyOrderUpdateArgs<ExtArgs>>): Prisma__PharmacyOrderClient<$Result.GetResult<Prisma.$PharmacyOrderPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PharmacyOrders.
     * @param {PharmacyOrderDeleteManyArgs} args - Arguments to filter PharmacyOrders to delete.
     * @example
     * // Delete a few PharmacyOrders
     * const { count } = await prisma.pharmacyOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PharmacyOrderDeleteManyArgs>(args?: SelectSubset<T, PharmacyOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PharmacyOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PharmacyOrders
     * const pharmacyOrder = await prisma.pharmacyOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PharmacyOrderUpdateManyArgs>(args: SelectSubset<T, PharmacyOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PharmacyOrder.
     * @param {PharmacyOrderUpsertArgs} args - Arguments to update or create a PharmacyOrder.
     * @example
     * // Update or create a PharmacyOrder
     * const pharmacyOrder = await prisma.pharmacyOrder.upsert({
     *   create: {
     *     // ... data to create a PharmacyOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PharmacyOrder we want to update
     *   }
     * })
     */
    upsert<T extends PharmacyOrderUpsertArgs>(args: SelectSubset<T, PharmacyOrderUpsertArgs<ExtArgs>>): Prisma__PharmacyOrderClient<$Result.GetResult<Prisma.$PharmacyOrderPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PharmacyOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyOrderCountArgs} args - Arguments to filter PharmacyOrders to count.
     * @example
     * // Count the number of PharmacyOrders
     * const count = await prisma.pharmacyOrder.count({
     *   where: {
     *     // ... the filter for the PharmacyOrders we want to count
     *   }
     * })
    **/
    count<T extends PharmacyOrderCountArgs>(
      args?: Subset<T, PharmacyOrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PharmacyOrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PharmacyOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PharmacyOrderAggregateArgs>(args: Subset<T, PharmacyOrderAggregateArgs>): Prisma.PrismaPromise<GetPharmacyOrderAggregateType<T>>

    /**
     * Group by PharmacyOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PharmacyOrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PharmacyOrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PharmacyOrderGroupByArgs['orderBy'] }
        : { orderBy?: PharmacyOrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PharmacyOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPharmacyOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PharmacyOrder model
   */
  readonly fields: PharmacyOrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PharmacyOrder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PharmacyOrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PharmacyOrder model
   */ 
  interface PharmacyOrderFieldRefs {
    readonly id: FieldRef<"PharmacyOrder", 'Int'>
    readonly code: FieldRef<"PharmacyOrder", 'String'>
    readonly customerId: FieldRef<"PharmacyOrder", 'String'>
    readonly customerName: FieldRef<"PharmacyOrder", 'String'>
    readonly customerPhone: FieldRef<"PharmacyOrder", 'String'>
    readonly pharmacy: FieldRef<"PharmacyOrder", 'String'>
    readonly itemsCount: FieldRef<"PharmacyOrder", 'Int'>
    readonly totalAmount: FieldRef<"PharmacyOrder", 'Float'>
    readonly date: FieldRef<"PharmacyOrder", 'String'>
    readonly status: FieldRef<"PharmacyOrder", 'String'>
    readonly createdAt: FieldRef<"PharmacyOrder", 'DateTime'>
    readonly updatedAt: FieldRef<"PharmacyOrder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PharmacyOrder findUnique
   */
  export type PharmacyOrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyOrder
     */
    select?: PharmacyOrderSelect<ExtArgs> | null
    /**
     * Filter, which PharmacyOrder to fetch.
     */
    where: PharmacyOrderWhereUniqueInput
  }

  /**
   * PharmacyOrder findUniqueOrThrow
   */
  export type PharmacyOrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyOrder
     */
    select?: PharmacyOrderSelect<ExtArgs> | null
    /**
     * Filter, which PharmacyOrder to fetch.
     */
    where: PharmacyOrderWhereUniqueInput
  }

  /**
   * PharmacyOrder findFirst
   */
  export type PharmacyOrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyOrder
     */
    select?: PharmacyOrderSelect<ExtArgs> | null
    /**
     * Filter, which PharmacyOrder to fetch.
     */
    where?: PharmacyOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PharmacyOrders to fetch.
     */
    orderBy?: PharmacyOrderOrderByWithRelationInput | PharmacyOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PharmacyOrders.
     */
    cursor?: PharmacyOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PharmacyOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PharmacyOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PharmacyOrders.
     */
    distinct?: PharmacyOrderScalarFieldEnum | PharmacyOrderScalarFieldEnum[]
  }

  /**
   * PharmacyOrder findFirstOrThrow
   */
  export type PharmacyOrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyOrder
     */
    select?: PharmacyOrderSelect<ExtArgs> | null
    /**
     * Filter, which PharmacyOrder to fetch.
     */
    where?: PharmacyOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PharmacyOrders to fetch.
     */
    orderBy?: PharmacyOrderOrderByWithRelationInput | PharmacyOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PharmacyOrders.
     */
    cursor?: PharmacyOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PharmacyOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PharmacyOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PharmacyOrders.
     */
    distinct?: PharmacyOrderScalarFieldEnum | PharmacyOrderScalarFieldEnum[]
  }

  /**
   * PharmacyOrder findMany
   */
  export type PharmacyOrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyOrder
     */
    select?: PharmacyOrderSelect<ExtArgs> | null
    /**
     * Filter, which PharmacyOrders to fetch.
     */
    where?: PharmacyOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PharmacyOrders to fetch.
     */
    orderBy?: PharmacyOrderOrderByWithRelationInput | PharmacyOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PharmacyOrders.
     */
    cursor?: PharmacyOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PharmacyOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PharmacyOrders.
     */
    skip?: number
    distinct?: PharmacyOrderScalarFieldEnum | PharmacyOrderScalarFieldEnum[]
  }

  /**
   * PharmacyOrder create
   */
  export type PharmacyOrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyOrder
     */
    select?: PharmacyOrderSelect<ExtArgs> | null
    /**
     * The data needed to create a PharmacyOrder.
     */
    data: XOR<PharmacyOrderCreateInput, PharmacyOrderUncheckedCreateInput>
  }

  /**
   * PharmacyOrder createMany
   */
  export type PharmacyOrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PharmacyOrders.
     */
    data: PharmacyOrderCreateManyInput | PharmacyOrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PharmacyOrder createManyAndReturn
   */
  export type PharmacyOrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyOrder
     */
    select?: PharmacyOrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PharmacyOrders.
     */
    data: PharmacyOrderCreateManyInput | PharmacyOrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PharmacyOrder update
   */
  export type PharmacyOrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyOrder
     */
    select?: PharmacyOrderSelect<ExtArgs> | null
    /**
     * The data needed to update a PharmacyOrder.
     */
    data: XOR<PharmacyOrderUpdateInput, PharmacyOrderUncheckedUpdateInput>
    /**
     * Choose, which PharmacyOrder to update.
     */
    where: PharmacyOrderWhereUniqueInput
  }

  /**
   * PharmacyOrder updateMany
   */
  export type PharmacyOrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PharmacyOrders.
     */
    data: XOR<PharmacyOrderUpdateManyMutationInput, PharmacyOrderUncheckedUpdateManyInput>
    /**
     * Filter which PharmacyOrders to update
     */
    where?: PharmacyOrderWhereInput
  }

  /**
   * PharmacyOrder upsert
   */
  export type PharmacyOrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyOrder
     */
    select?: PharmacyOrderSelect<ExtArgs> | null
    /**
     * The filter to search for the PharmacyOrder to update in case it exists.
     */
    where: PharmacyOrderWhereUniqueInput
    /**
     * In case the PharmacyOrder found by the `where` argument doesn't exist, create a new PharmacyOrder with this data.
     */
    create: XOR<PharmacyOrderCreateInput, PharmacyOrderUncheckedCreateInput>
    /**
     * In case the PharmacyOrder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PharmacyOrderUpdateInput, PharmacyOrderUncheckedUpdateInput>
  }

  /**
   * PharmacyOrder delete
   */
  export type PharmacyOrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyOrder
     */
    select?: PharmacyOrderSelect<ExtArgs> | null
    /**
     * Filter which PharmacyOrder to delete.
     */
    where: PharmacyOrderWhereUniqueInput
  }

  /**
   * PharmacyOrder deleteMany
   */
  export type PharmacyOrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PharmacyOrders to delete
     */
    where?: PharmacyOrderWhereInput
  }

  /**
   * PharmacyOrder without action
   */
  export type PharmacyOrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PharmacyOrder
     */
    select?: PharmacyOrderSelect<ExtArgs> | null
  }


  /**
   * Model RefundRequest
   */

  export type AggregateRefundRequest = {
    _count: RefundRequestCountAggregateOutputType | null
    _avg: RefundRequestAvgAggregateOutputType | null
    _sum: RefundRequestSumAggregateOutputType | null
    _min: RefundRequestMinAggregateOutputType | null
    _max: RefundRequestMaxAggregateOutputType | null
  }

  export type RefundRequestAvgAggregateOutputType = {
    id: number | null
    amount: number | null
  }

  export type RefundRequestSumAggregateOutputType = {
    id: number | null
    amount: number | null
  }

  export type RefundRequestMinAggregateOutputType = {
    id: number | null
    orderCode: string | null
    customerId: string | null
    customerName: string | null
    originalOrder: string | null
    amount: number | null
    reason: string | null
    requestDate: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RefundRequestMaxAggregateOutputType = {
    id: number | null
    orderCode: string | null
    customerId: string | null
    customerName: string | null
    originalOrder: string | null
    amount: number | null
    reason: string | null
    requestDate: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RefundRequestCountAggregateOutputType = {
    id: number
    orderCode: number
    customerId: number
    customerName: number
    originalOrder: number
    amount: number
    reason: number
    requestDate: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RefundRequestAvgAggregateInputType = {
    id?: true
    amount?: true
  }

  export type RefundRequestSumAggregateInputType = {
    id?: true
    amount?: true
  }

  export type RefundRequestMinAggregateInputType = {
    id?: true
    orderCode?: true
    customerId?: true
    customerName?: true
    originalOrder?: true
    amount?: true
    reason?: true
    requestDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RefundRequestMaxAggregateInputType = {
    id?: true
    orderCode?: true
    customerId?: true
    customerName?: true
    originalOrder?: true
    amount?: true
    reason?: true
    requestDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RefundRequestCountAggregateInputType = {
    id?: true
    orderCode?: true
    customerId?: true
    customerName?: true
    originalOrder?: true
    amount?: true
    reason?: true
    requestDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RefundRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefundRequest to aggregate.
     */
    where?: RefundRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefundRequests to fetch.
     */
    orderBy?: RefundRequestOrderByWithRelationInput | RefundRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefundRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefundRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefundRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefundRequests
    **/
    _count?: true | RefundRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RefundRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RefundRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefundRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefundRequestMaxAggregateInputType
  }

  export type GetRefundRequestAggregateType<T extends RefundRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateRefundRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefundRequest[P]>
      : GetScalarType<T[P], AggregateRefundRequest[P]>
  }




  export type RefundRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefundRequestWhereInput
    orderBy?: RefundRequestOrderByWithAggregationInput | RefundRequestOrderByWithAggregationInput[]
    by: RefundRequestScalarFieldEnum[] | RefundRequestScalarFieldEnum
    having?: RefundRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefundRequestCountAggregateInputType | true
    _avg?: RefundRequestAvgAggregateInputType
    _sum?: RefundRequestSumAggregateInputType
    _min?: RefundRequestMinAggregateInputType
    _max?: RefundRequestMaxAggregateInputType
  }

  export type RefundRequestGroupByOutputType = {
    id: number
    orderCode: string
    customerId: string
    customerName: string
    originalOrder: string
    amount: number
    reason: string
    requestDate: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: RefundRequestCountAggregateOutputType | null
    _avg: RefundRequestAvgAggregateOutputType | null
    _sum: RefundRequestSumAggregateOutputType | null
    _min: RefundRequestMinAggregateOutputType | null
    _max: RefundRequestMaxAggregateOutputType | null
  }

  type GetRefundRequestGroupByPayload<T extends RefundRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefundRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefundRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefundRequestGroupByOutputType[P]>
            : GetScalarType<T[P], RefundRequestGroupByOutputType[P]>
        }
      >
    >


  export type RefundRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderCode?: boolean
    customerId?: boolean
    customerName?: boolean
    originalOrder?: boolean
    amount?: boolean
    reason?: boolean
    requestDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["refundRequest"]>

  export type RefundRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderCode?: boolean
    customerId?: boolean
    customerName?: boolean
    originalOrder?: boolean
    amount?: boolean
    reason?: boolean
    requestDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["refundRequest"]>

  export type RefundRequestSelectScalar = {
    id?: boolean
    orderCode?: boolean
    customerId?: boolean
    customerName?: boolean
    originalOrder?: boolean
    amount?: boolean
    reason?: boolean
    requestDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $RefundRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefundRequest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderCode: string
      customerId: string
      customerName: string
      originalOrder: string
      amount: number
      reason: string
      requestDate: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["refundRequest"]>
    composites: {}
  }

  type RefundRequestGetPayload<S extends boolean | null | undefined | RefundRequestDefaultArgs> = $Result.GetResult<Prisma.$RefundRequestPayload, S>

  type RefundRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RefundRequestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RefundRequestCountAggregateInputType | true
    }

  export interface RefundRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefundRequest'], meta: { name: 'RefundRequest' } }
    /**
     * Find zero or one RefundRequest that matches the filter.
     * @param {RefundRequestFindUniqueArgs} args - Arguments to find a RefundRequest
     * @example
     * // Get one RefundRequest
     * const refundRequest = await prisma.refundRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefundRequestFindUniqueArgs>(args: SelectSubset<T, RefundRequestFindUniqueArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RefundRequest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RefundRequestFindUniqueOrThrowArgs} args - Arguments to find a RefundRequest
     * @example
     * // Get one RefundRequest
     * const refundRequest = await prisma.refundRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefundRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, RefundRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RefundRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestFindFirstArgs} args - Arguments to find a RefundRequest
     * @example
     * // Get one RefundRequest
     * const refundRequest = await prisma.refundRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefundRequestFindFirstArgs>(args?: SelectSubset<T, RefundRequestFindFirstArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RefundRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestFindFirstOrThrowArgs} args - Arguments to find a RefundRequest
     * @example
     * // Get one RefundRequest
     * const refundRequest = await prisma.refundRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefundRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, RefundRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RefundRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefundRequests
     * const refundRequests = await prisma.refundRequest.findMany()
     * 
     * // Get first 10 RefundRequests
     * const refundRequests = await prisma.refundRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refundRequestWithIdOnly = await prisma.refundRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefundRequestFindManyArgs>(args?: SelectSubset<T, RefundRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RefundRequest.
     * @param {RefundRequestCreateArgs} args - Arguments to create a RefundRequest.
     * @example
     * // Create one RefundRequest
     * const RefundRequest = await prisma.refundRequest.create({
     *   data: {
     *     // ... data to create a RefundRequest
     *   }
     * })
     * 
     */
    create<T extends RefundRequestCreateArgs>(args: SelectSubset<T, RefundRequestCreateArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RefundRequests.
     * @param {RefundRequestCreateManyArgs} args - Arguments to create many RefundRequests.
     * @example
     * // Create many RefundRequests
     * const refundRequest = await prisma.refundRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefundRequestCreateManyArgs>(args?: SelectSubset<T, RefundRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefundRequests and returns the data saved in the database.
     * @param {RefundRequestCreateManyAndReturnArgs} args - Arguments to create many RefundRequests.
     * @example
     * // Create many RefundRequests
     * const refundRequest = await prisma.refundRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefundRequests and only return the `id`
     * const refundRequestWithIdOnly = await prisma.refundRequest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefundRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, RefundRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RefundRequest.
     * @param {RefundRequestDeleteArgs} args - Arguments to delete one RefundRequest.
     * @example
     * // Delete one RefundRequest
     * const RefundRequest = await prisma.refundRequest.delete({
     *   where: {
     *     // ... filter to delete one RefundRequest
     *   }
     * })
     * 
     */
    delete<T extends RefundRequestDeleteArgs>(args: SelectSubset<T, RefundRequestDeleteArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RefundRequest.
     * @param {RefundRequestUpdateArgs} args - Arguments to update one RefundRequest.
     * @example
     * // Update one RefundRequest
     * const refundRequest = await prisma.refundRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefundRequestUpdateArgs>(args: SelectSubset<T, RefundRequestUpdateArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RefundRequests.
     * @param {RefundRequestDeleteManyArgs} args - Arguments to filter RefundRequests to delete.
     * @example
     * // Delete a few RefundRequests
     * const { count } = await prisma.refundRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefundRequestDeleteManyArgs>(args?: SelectSubset<T, RefundRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefundRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefundRequests
     * const refundRequest = await prisma.refundRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefundRequestUpdateManyArgs>(args: SelectSubset<T, RefundRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RefundRequest.
     * @param {RefundRequestUpsertArgs} args - Arguments to update or create a RefundRequest.
     * @example
     * // Update or create a RefundRequest
     * const refundRequest = await prisma.refundRequest.upsert({
     *   create: {
     *     // ... data to create a RefundRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefundRequest we want to update
     *   }
     * })
     */
    upsert<T extends RefundRequestUpsertArgs>(args: SelectSubset<T, RefundRequestUpsertArgs<ExtArgs>>): Prisma__RefundRequestClient<$Result.GetResult<Prisma.$RefundRequestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RefundRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestCountArgs} args - Arguments to filter RefundRequests to count.
     * @example
     * // Count the number of RefundRequests
     * const count = await prisma.refundRequest.count({
     *   where: {
     *     // ... the filter for the RefundRequests we want to count
     *   }
     * })
    **/
    count<T extends RefundRequestCountArgs>(
      args?: Subset<T, RefundRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefundRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefundRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefundRequestAggregateArgs>(args: Subset<T, RefundRequestAggregateArgs>): Prisma.PrismaPromise<GetRefundRequestAggregateType<T>>

    /**
     * Group by RefundRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefundRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefundRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefundRequestGroupByArgs['orderBy'] }
        : { orderBy?: RefundRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefundRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefundRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefundRequest model
   */
  readonly fields: RefundRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefundRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefundRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefundRequest model
   */ 
  interface RefundRequestFieldRefs {
    readonly id: FieldRef<"RefundRequest", 'Int'>
    readonly orderCode: FieldRef<"RefundRequest", 'String'>
    readonly customerId: FieldRef<"RefundRequest", 'String'>
    readonly customerName: FieldRef<"RefundRequest", 'String'>
    readonly originalOrder: FieldRef<"RefundRequest", 'String'>
    readonly amount: FieldRef<"RefundRequest", 'Float'>
    readonly reason: FieldRef<"RefundRequest", 'String'>
    readonly requestDate: FieldRef<"RefundRequest", 'String'>
    readonly status: FieldRef<"RefundRequest", 'String'>
    readonly createdAt: FieldRef<"RefundRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"RefundRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefundRequest findUnique
   */
  export type RefundRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Filter, which RefundRequest to fetch.
     */
    where: RefundRequestWhereUniqueInput
  }

  /**
   * RefundRequest findUniqueOrThrow
   */
  export type RefundRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Filter, which RefundRequest to fetch.
     */
    where: RefundRequestWhereUniqueInput
  }

  /**
   * RefundRequest findFirst
   */
  export type RefundRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Filter, which RefundRequest to fetch.
     */
    where?: RefundRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefundRequests to fetch.
     */
    orderBy?: RefundRequestOrderByWithRelationInput | RefundRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefundRequests.
     */
    cursor?: RefundRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefundRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefundRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefundRequests.
     */
    distinct?: RefundRequestScalarFieldEnum | RefundRequestScalarFieldEnum[]
  }

  /**
   * RefundRequest findFirstOrThrow
   */
  export type RefundRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Filter, which RefundRequest to fetch.
     */
    where?: RefundRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefundRequests to fetch.
     */
    orderBy?: RefundRequestOrderByWithRelationInput | RefundRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefundRequests.
     */
    cursor?: RefundRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefundRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefundRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefundRequests.
     */
    distinct?: RefundRequestScalarFieldEnum | RefundRequestScalarFieldEnum[]
  }

  /**
   * RefundRequest findMany
   */
  export type RefundRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Filter, which RefundRequests to fetch.
     */
    where?: RefundRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefundRequests to fetch.
     */
    orderBy?: RefundRequestOrderByWithRelationInput | RefundRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefundRequests.
     */
    cursor?: RefundRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefundRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefundRequests.
     */
    skip?: number
    distinct?: RefundRequestScalarFieldEnum | RefundRequestScalarFieldEnum[]
  }

  /**
   * RefundRequest create
   */
  export type RefundRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * The data needed to create a RefundRequest.
     */
    data: XOR<RefundRequestCreateInput, RefundRequestUncheckedCreateInput>
  }

  /**
   * RefundRequest createMany
   */
  export type RefundRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefundRequests.
     */
    data: RefundRequestCreateManyInput | RefundRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefundRequest createManyAndReturn
   */
  export type RefundRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RefundRequests.
     */
    data: RefundRequestCreateManyInput | RefundRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefundRequest update
   */
  export type RefundRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * The data needed to update a RefundRequest.
     */
    data: XOR<RefundRequestUpdateInput, RefundRequestUncheckedUpdateInput>
    /**
     * Choose, which RefundRequest to update.
     */
    where: RefundRequestWhereUniqueInput
  }

  /**
   * RefundRequest updateMany
   */
  export type RefundRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefundRequests.
     */
    data: XOR<RefundRequestUpdateManyMutationInput, RefundRequestUncheckedUpdateManyInput>
    /**
     * Filter which RefundRequests to update
     */
    where?: RefundRequestWhereInput
  }

  /**
   * RefundRequest upsert
   */
  export type RefundRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * The filter to search for the RefundRequest to update in case it exists.
     */
    where: RefundRequestWhereUniqueInput
    /**
     * In case the RefundRequest found by the `where` argument doesn't exist, create a new RefundRequest with this data.
     */
    create: XOR<RefundRequestCreateInput, RefundRequestUncheckedCreateInput>
    /**
     * In case the RefundRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefundRequestUpdateInput, RefundRequestUncheckedUpdateInput>
  }

  /**
   * RefundRequest delete
   */
  export type RefundRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
    /**
     * Filter which RefundRequest to delete.
     */
    where: RefundRequestWhereUniqueInput
  }

  /**
   * RefundRequest deleteMany
   */
  export type RefundRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefundRequests to delete
     */
    where?: RefundRequestWhereInput
  }

  /**
   * RefundRequest without action
   */
  export type RefundRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefundRequest
     */
    select?: RefundRequestSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    patientName: 'patientName',
    patientPhone: 'patientPhone',
    doctorId: 'doctorId',
    doctorName: 'doctorName',
    date: 'date',
    time: 'time',
    service: 'service',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const LabTestScalarFieldEnum: {
    id: 'id',
    orderCode: 'orderCode',
    patientId: 'patientId',
    patientName: 'patientName',
    patientPhone: 'patientPhone',
    testType: 'testType',
    hospital: 'hospital',
    fee: 'fee',
    testDate: 'testDate',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LabTestScalarFieldEnum = (typeof LabTestScalarFieldEnum)[keyof typeof LabTestScalarFieldEnum]


  export const PharmacyOrderScalarFieldEnum: {
    id: 'id',
    code: 'code',
    customerId: 'customerId',
    customerName: 'customerName',
    customerPhone: 'customerPhone',
    pharmacy: 'pharmacy',
    itemsCount: 'itemsCount',
    totalAmount: 'totalAmount',
    date: 'date',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PharmacyOrderScalarFieldEnum = (typeof PharmacyOrderScalarFieldEnum)[keyof typeof PharmacyOrderScalarFieldEnum]


  export const RefundRequestScalarFieldEnum: {
    id: 'id',
    orderCode: 'orderCode',
    customerId: 'customerId',
    customerName: 'customerName',
    originalOrder: 'originalOrder',
    amount: 'amount',
    reason: 'reason',
    requestDate: 'requestDate',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RefundRequestScalarFieldEnum = (typeof RefundRequestScalarFieldEnum)[keyof typeof RefundRequestScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: IntFilter<"Appointment"> | number
    patientId?: StringFilter<"Appointment"> | string
    patientName?: StringFilter<"Appointment"> | string
    patientPhone?: StringFilter<"Appointment"> | string
    doctorId?: StringFilter<"Appointment"> | string
    doctorName?: StringFilter<"Appointment"> | string
    date?: StringFilter<"Appointment"> | string
    time?: StringFilter<"Appointment"> | string
    service?: StringFilter<"Appointment"> | string
    status?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientPhone?: SortOrder
    doctorId?: SortOrder
    doctorName?: SortOrder
    date?: SortOrder
    time?: SortOrder
    service?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    patientId?: StringFilter<"Appointment"> | string
    patientName?: StringFilter<"Appointment"> | string
    patientPhone?: StringFilter<"Appointment"> | string
    doctorId?: StringFilter<"Appointment"> | string
    doctorName?: StringFilter<"Appointment"> | string
    date?: StringFilter<"Appointment"> | string
    time?: StringFilter<"Appointment"> | string
    service?: StringFilter<"Appointment"> | string
    status?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientPhone?: SortOrder
    doctorId?: SortOrder
    doctorName?: SortOrder
    date?: SortOrder
    time?: SortOrder
    service?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _avg?: AppointmentAvgOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
    _sum?: AppointmentSumOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Appointment"> | number
    patientId?: StringWithAggregatesFilter<"Appointment"> | string
    patientName?: StringWithAggregatesFilter<"Appointment"> | string
    patientPhone?: StringWithAggregatesFilter<"Appointment"> | string
    doctorId?: StringWithAggregatesFilter<"Appointment"> | string
    doctorName?: StringWithAggregatesFilter<"Appointment"> | string
    date?: StringWithAggregatesFilter<"Appointment"> | string
    time?: StringWithAggregatesFilter<"Appointment"> | string
    service?: StringWithAggregatesFilter<"Appointment"> | string
    status?: StringWithAggregatesFilter<"Appointment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type LabTestWhereInput = {
    AND?: LabTestWhereInput | LabTestWhereInput[]
    OR?: LabTestWhereInput[]
    NOT?: LabTestWhereInput | LabTestWhereInput[]
    id?: IntFilter<"LabTest"> | number
    orderCode?: StringFilter<"LabTest"> | string
    patientId?: StringFilter<"LabTest"> | string
    patientName?: StringFilter<"LabTest"> | string
    patientPhone?: StringFilter<"LabTest"> | string
    testType?: StringFilter<"LabTest"> | string
    hospital?: StringFilter<"LabTest"> | string
    fee?: FloatFilter<"LabTest"> | number
    testDate?: StringFilter<"LabTest"> | string
    status?: StringFilter<"LabTest"> | string
    createdAt?: DateTimeFilter<"LabTest"> | Date | string
    updatedAt?: DateTimeFilter<"LabTest"> | Date | string
  }

  export type LabTestOrderByWithRelationInput = {
    id?: SortOrder
    orderCode?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientPhone?: SortOrder
    testType?: SortOrder
    hospital?: SortOrder
    fee?: SortOrder
    testDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LabTestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    orderCode?: string
    AND?: LabTestWhereInput | LabTestWhereInput[]
    OR?: LabTestWhereInput[]
    NOT?: LabTestWhereInput | LabTestWhereInput[]
    patientId?: StringFilter<"LabTest"> | string
    patientName?: StringFilter<"LabTest"> | string
    patientPhone?: StringFilter<"LabTest"> | string
    testType?: StringFilter<"LabTest"> | string
    hospital?: StringFilter<"LabTest"> | string
    fee?: FloatFilter<"LabTest"> | number
    testDate?: StringFilter<"LabTest"> | string
    status?: StringFilter<"LabTest"> | string
    createdAt?: DateTimeFilter<"LabTest"> | Date | string
    updatedAt?: DateTimeFilter<"LabTest"> | Date | string
  }, "id" | "orderCode">

  export type LabTestOrderByWithAggregationInput = {
    id?: SortOrder
    orderCode?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientPhone?: SortOrder
    testType?: SortOrder
    hospital?: SortOrder
    fee?: SortOrder
    testDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LabTestCountOrderByAggregateInput
    _avg?: LabTestAvgOrderByAggregateInput
    _max?: LabTestMaxOrderByAggregateInput
    _min?: LabTestMinOrderByAggregateInput
    _sum?: LabTestSumOrderByAggregateInput
  }

  export type LabTestScalarWhereWithAggregatesInput = {
    AND?: LabTestScalarWhereWithAggregatesInput | LabTestScalarWhereWithAggregatesInput[]
    OR?: LabTestScalarWhereWithAggregatesInput[]
    NOT?: LabTestScalarWhereWithAggregatesInput | LabTestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LabTest"> | number
    orderCode?: StringWithAggregatesFilter<"LabTest"> | string
    patientId?: StringWithAggregatesFilter<"LabTest"> | string
    patientName?: StringWithAggregatesFilter<"LabTest"> | string
    patientPhone?: StringWithAggregatesFilter<"LabTest"> | string
    testType?: StringWithAggregatesFilter<"LabTest"> | string
    hospital?: StringWithAggregatesFilter<"LabTest"> | string
    fee?: FloatWithAggregatesFilter<"LabTest"> | number
    testDate?: StringWithAggregatesFilter<"LabTest"> | string
    status?: StringWithAggregatesFilter<"LabTest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LabTest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LabTest"> | Date | string
  }

  export type PharmacyOrderWhereInput = {
    AND?: PharmacyOrderWhereInput | PharmacyOrderWhereInput[]
    OR?: PharmacyOrderWhereInput[]
    NOT?: PharmacyOrderWhereInput | PharmacyOrderWhereInput[]
    id?: IntFilter<"PharmacyOrder"> | number
    code?: StringFilter<"PharmacyOrder"> | string
    customerId?: StringFilter<"PharmacyOrder"> | string
    customerName?: StringFilter<"PharmacyOrder"> | string
    customerPhone?: StringFilter<"PharmacyOrder"> | string
    pharmacy?: StringFilter<"PharmacyOrder"> | string
    itemsCount?: IntFilter<"PharmacyOrder"> | number
    totalAmount?: FloatFilter<"PharmacyOrder"> | number
    date?: StringFilter<"PharmacyOrder"> | string
    status?: StringFilter<"PharmacyOrder"> | string
    createdAt?: DateTimeFilter<"PharmacyOrder"> | Date | string
    updatedAt?: DateTimeFilter<"PharmacyOrder"> | Date | string
  }

  export type PharmacyOrderOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    pharmacy?: SortOrder
    itemsCount?: SortOrder
    totalAmount?: SortOrder
    date?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PharmacyOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: PharmacyOrderWhereInput | PharmacyOrderWhereInput[]
    OR?: PharmacyOrderWhereInput[]
    NOT?: PharmacyOrderWhereInput | PharmacyOrderWhereInput[]
    customerId?: StringFilter<"PharmacyOrder"> | string
    customerName?: StringFilter<"PharmacyOrder"> | string
    customerPhone?: StringFilter<"PharmacyOrder"> | string
    pharmacy?: StringFilter<"PharmacyOrder"> | string
    itemsCount?: IntFilter<"PharmacyOrder"> | number
    totalAmount?: FloatFilter<"PharmacyOrder"> | number
    date?: StringFilter<"PharmacyOrder"> | string
    status?: StringFilter<"PharmacyOrder"> | string
    createdAt?: DateTimeFilter<"PharmacyOrder"> | Date | string
    updatedAt?: DateTimeFilter<"PharmacyOrder"> | Date | string
  }, "id" | "code">

  export type PharmacyOrderOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    pharmacy?: SortOrder
    itemsCount?: SortOrder
    totalAmount?: SortOrder
    date?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PharmacyOrderCountOrderByAggregateInput
    _avg?: PharmacyOrderAvgOrderByAggregateInput
    _max?: PharmacyOrderMaxOrderByAggregateInput
    _min?: PharmacyOrderMinOrderByAggregateInput
    _sum?: PharmacyOrderSumOrderByAggregateInput
  }

  export type PharmacyOrderScalarWhereWithAggregatesInput = {
    AND?: PharmacyOrderScalarWhereWithAggregatesInput | PharmacyOrderScalarWhereWithAggregatesInput[]
    OR?: PharmacyOrderScalarWhereWithAggregatesInput[]
    NOT?: PharmacyOrderScalarWhereWithAggregatesInput | PharmacyOrderScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PharmacyOrder"> | number
    code?: StringWithAggregatesFilter<"PharmacyOrder"> | string
    customerId?: StringWithAggregatesFilter<"PharmacyOrder"> | string
    customerName?: StringWithAggregatesFilter<"PharmacyOrder"> | string
    customerPhone?: StringWithAggregatesFilter<"PharmacyOrder"> | string
    pharmacy?: StringWithAggregatesFilter<"PharmacyOrder"> | string
    itemsCount?: IntWithAggregatesFilter<"PharmacyOrder"> | number
    totalAmount?: FloatWithAggregatesFilter<"PharmacyOrder"> | number
    date?: StringWithAggregatesFilter<"PharmacyOrder"> | string
    status?: StringWithAggregatesFilter<"PharmacyOrder"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PharmacyOrder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PharmacyOrder"> | Date | string
  }

  export type RefundRequestWhereInput = {
    AND?: RefundRequestWhereInput | RefundRequestWhereInput[]
    OR?: RefundRequestWhereInput[]
    NOT?: RefundRequestWhereInput | RefundRequestWhereInput[]
    id?: IntFilter<"RefundRequest"> | number
    orderCode?: StringFilter<"RefundRequest"> | string
    customerId?: StringFilter<"RefundRequest"> | string
    customerName?: StringFilter<"RefundRequest"> | string
    originalOrder?: StringFilter<"RefundRequest"> | string
    amount?: FloatFilter<"RefundRequest"> | number
    reason?: StringFilter<"RefundRequest"> | string
    requestDate?: StringFilter<"RefundRequest"> | string
    status?: StringFilter<"RefundRequest"> | string
    createdAt?: DateTimeFilter<"RefundRequest"> | Date | string
    updatedAt?: DateTimeFilter<"RefundRequest"> | Date | string
  }

  export type RefundRequestOrderByWithRelationInput = {
    id?: SortOrder
    orderCode?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    originalOrder?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    requestDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefundRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    orderCode?: string
    AND?: RefundRequestWhereInput | RefundRequestWhereInput[]
    OR?: RefundRequestWhereInput[]
    NOT?: RefundRequestWhereInput | RefundRequestWhereInput[]
    customerId?: StringFilter<"RefundRequest"> | string
    customerName?: StringFilter<"RefundRequest"> | string
    originalOrder?: StringFilter<"RefundRequest"> | string
    amount?: FloatFilter<"RefundRequest"> | number
    reason?: StringFilter<"RefundRequest"> | string
    requestDate?: StringFilter<"RefundRequest"> | string
    status?: StringFilter<"RefundRequest"> | string
    createdAt?: DateTimeFilter<"RefundRequest"> | Date | string
    updatedAt?: DateTimeFilter<"RefundRequest"> | Date | string
  }, "id" | "orderCode">

  export type RefundRequestOrderByWithAggregationInput = {
    id?: SortOrder
    orderCode?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    originalOrder?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    requestDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RefundRequestCountOrderByAggregateInput
    _avg?: RefundRequestAvgOrderByAggregateInput
    _max?: RefundRequestMaxOrderByAggregateInput
    _min?: RefundRequestMinOrderByAggregateInput
    _sum?: RefundRequestSumOrderByAggregateInput
  }

  export type RefundRequestScalarWhereWithAggregatesInput = {
    AND?: RefundRequestScalarWhereWithAggregatesInput | RefundRequestScalarWhereWithAggregatesInput[]
    OR?: RefundRequestScalarWhereWithAggregatesInput[]
    NOT?: RefundRequestScalarWhereWithAggregatesInput | RefundRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RefundRequest"> | number
    orderCode?: StringWithAggregatesFilter<"RefundRequest"> | string
    customerId?: StringWithAggregatesFilter<"RefundRequest"> | string
    customerName?: StringWithAggregatesFilter<"RefundRequest"> | string
    originalOrder?: StringWithAggregatesFilter<"RefundRequest"> | string
    amount?: FloatWithAggregatesFilter<"RefundRequest"> | number
    reason?: StringWithAggregatesFilter<"RefundRequest"> | string
    requestDate?: StringWithAggregatesFilter<"RefundRequest"> | string
    status?: StringWithAggregatesFilter<"RefundRequest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RefundRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RefundRequest"> | Date | string
  }

  export type AppointmentCreateInput = {
    patientId: string
    patientName: string
    patientPhone: string
    doctorId: string
    doctorName: string
    date: string
    time: string
    service: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUncheckedCreateInput = {
    id?: number
    patientId: string
    patientName: string
    patientPhone: string
    doctorId: string
    doctorName: string
    date: string
    time: string
    service: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateInput = {
    patientId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    doctorName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    doctorName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    id?: number
    patientId: string
    patientName: string
    patientPhone: string
    doctorId: string
    doctorName: string
    date: string
    time: string
    service: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    patientId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    doctorName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    doctorName?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabTestCreateInput = {
    orderCode: string
    patientId: string
    patientName: string
    patientPhone: string
    testType: string
    hospital: string
    fee: number
    testDate: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabTestUncheckedCreateInput = {
    id?: number
    orderCode: string
    patientId: string
    patientName: string
    patientPhone: string
    testType: string
    hospital: string
    fee: number
    testDate: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabTestUpdateInput = {
    orderCode?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    hospital?: StringFieldUpdateOperationsInput | string
    fee?: FloatFieldUpdateOperationsInput | number
    testDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabTestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderCode?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    hospital?: StringFieldUpdateOperationsInput | string
    fee?: FloatFieldUpdateOperationsInput | number
    testDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabTestCreateManyInput = {
    id?: number
    orderCode: string
    patientId: string
    patientName: string
    patientPhone: string
    testType: string
    hospital: string
    fee: number
    testDate: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabTestUpdateManyMutationInput = {
    orderCode?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    hospital?: StringFieldUpdateOperationsInput | string
    fee?: FloatFieldUpdateOperationsInput | number
    testDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabTestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderCode?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    patientName?: StringFieldUpdateOperationsInput | string
    patientPhone?: StringFieldUpdateOperationsInput | string
    testType?: StringFieldUpdateOperationsInput | string
    hospital?: StringFieldUpdateOperationsInput | string
    fee?: FloatFieldUpdateOperationsInput | number
    testDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PharmacyOrderCreateInput = {
    code: string
    customerId: string
    customerName: string
    customerPhone: string
    pharmacy: string
    itemsCount: number
    totalAmount: number
    date: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PharmacyOrderUncheckedCreateInput = {
    id?: number
    code: string
    customerId: string
    customerName: string
    customerPhone: string
    pharmacy: string
    itemsCount: number
    totalAmount: number
    date: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PharmacyOrderUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    pharmacy?: StringFieldUpdateOperationsInput | string
    itemsCount?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PharmacyOrderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    pharmacy?: StringFieldUpdateOperationsInput | string
    itemsCount?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PharmacyOrderCreateManyInput = {
    id?: number
    code: string
    customerId: string
    customerName: string
    customerPhone: string
    pharmacy: string
    itemsCount: number
    totalAmount: number
    date: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PharmacyOrderUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    pharmacy?: StringFieldUpdateOperationsInput | string
    itemsCount?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PharmacyOrderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerPhone?: StringFieldUpdateOperationsInput | string
    pharmacy?: StringFieldUpdateOperationsInput | string
    itemsCount?: IntFieldUpdateOperationsInput | number
    totalAmount?: FloatFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundRequestCreateInput = {
    orderCode: string
    customerId: string
    customerName: string
    originalOrder: string
    amount: number
    reason: string
    requestDate: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundRequestUncheckedCreateInput = {
    id?: number
    orderCode: string
    customerId: string
    customerName: string
    originalOrder: string
    amount: number
    reason: string
    requestDate: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundRequestUpdateInput = {
    orderCode?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    originalOrder?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    requestDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderCode?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    originalOrder?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    requestDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundRequestCreateManyInput = {
    id?: number
    orderCode: string
    customerId: string
    customerName: string
    originalOrder: string
    amount: number
    reason: string
    requestDate: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefundRequestUpdateManyMutationInput = {
    orderCode?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    originalOrder?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    requestDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefundRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderCode?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    originalOrder?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    requestDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientPhone?: SortOrder
    doctorId?: SortOrder
    doctorName?: SortOrder
    date?: SortOrder
    time?: SortOrder
    service?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientPhone?: SortOrder
    doctorId?: SortOrder
    doctorName?: SortOrder
    date?: SortOrder
    time?: SortOrder
    service?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientPhone?: SortOrder
    doctorId?: SortOrder
    doctorName?: SortOrder
    date?: SortOrder
    time?: SortOrder
    service?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type LabTestCountOrderByAggregateInput = {
    id?: SortOrder
    orderCode?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientPhone?: SortOrder
    testType?: SortOrder
    hospital?: SortOrder
    fee?: SortOrder
    testDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LabTestAvgOrderByAggregateInput = {
    id?: SortOrder
    fee?: SortOrder
  }

  export type LabTestMaxOrderByAggregateInput = {
    id?: SortOrder
    orderCode?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientPhone?: SortOrder
    testType?: SortOrder
    hospital?: SortOrder
    fee?: SortOrder
    testDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LabTestMinOrderByAggregateInput = {
    id?: SortOrder
    orderCode?: SortOrder
    patientId?: SortOrder
    patientName?: SortOrder
    patientPhone?: SortOrder
    testType?: SortOrder
    hospital?: SortOrder
    fee?: SortOrder
    testDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LabTestSumOrderByAggregateInput = {
    id?: SortOrder
    fee?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PharmacyOrderCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    pharmacy?: SortOrder
    itemsCount?: SortOrder
    totalAmount?: SortOrder
    date?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PharmacyOrderAvgOrderByAggregateInput = {
    id?: SortOrder
    itemsCount?: SortOrder
    totalAmount?: SortOrder
  }

  export type PharmacyOrderMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    pharmacy?: SortOrder
    itemsCount?: SortOrder
    totalAmount?: SortOrder
    date?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PharmacyOrderMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    pharmacy?: SortOrder
    itemsCount?: SortOrder
    totalAmount?: SortOrder
    date?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PharmacyOrderSumOrderByAggregateInput = {
    id?: SortOrder
    itemsCount?: SortOrder
    totalAmount?: SortOrder
  }

  export type RefundRequestCountOrderByAggregateInput = {
    id?: SortOrder
    orderCode?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    originalOrder?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    requestDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefundRequestAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
  }

  export type RefundRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    orderCode?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    originalOrder?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    requestDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefundRequestMinOrderByAggregateInput = {
    id?: SortOrder
    orderCode?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    originalOrder?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    requestDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefundRequestSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use AppointmentDefaultArgs instead
     */
    export type AppointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppointmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LabTestDefaultArgs instead
     */
    export type LabTestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LabTestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PharmacyOrderDefaultArgs instead
     */
    export type PharmacyOrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PharmacyOrderDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RefundRequestDefaultArgs instead
     */
    export type RefundRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RefundRequestDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}