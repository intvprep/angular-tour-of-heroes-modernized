/**
 * Hero interface — equivalent to a Java POJO / DTO / Entity class.
 *
 * In TypeScript, `interface` defines a shape/contract (like a Java interface),
 * but it's erased at runtime — it only exists for compile-time type checking.
 * Think of it as a lightweight alternative to a Java record or data class.
 */
export interface Hero {
    id: number;
    name: string;
}
