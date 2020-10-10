type AGenericType<T> = T[];

type Placeholder = { aUniqueKey: unknown };
type Replace<T, X, Y> = {
  [k in keyof T]: T[k] extends X ? Y : T[k];
};

interface Monad<T> {
  map<A, B>(
    f: (a: A) => B
  ): (v: Replace<T, Placeholder, A>) => Replace<T, Placeholder, B>;
  lift<A>(a: A): Replace<T, Placeholder, A>;
  join<A>(
    tta: Replace<T, Placeholder, Replace<T, Placeholder, A>>
  ): Replace<T, Placeholder, A>;
}

function MONAD(m: Monad<AGenericType<Placeholder>>, f: (s: string) => number) {
  var a = m.map(f); // (v: string[]) => number[]
  var b = m.lift(1); // number[]
  var c = m.join([[2], [3]]); // number[]
}
