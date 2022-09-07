import { Transform } from 'class-transformer';

export function Trim(): PropertyDecorator {
  return Transform(({ value }: { value: string | Array<string> }) => {
    if (value instanceof Array) {
      return value.map((e) => {
        if (typeof e !== 'string') {
          return value;
        }

        return e.trim();
      });
    }

    if (typeof value === 'string') {
      return value.trim();
    }

    return value;
  });
}
