export type Indexed<T = unknown> = {
    [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p] && typeof rhs[p] === 'object') {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch(e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (object && typeof object !== 'object') {
    return object;
  }

  let newObject = path.split('.').reduceRight((acc: Indexed, item: string) => {
    if (Object.entries(acc).length == 0) return {[item]: value}
    
    return {[item]: acc}
  }, {})

  return merge(object as Indexed, newObject);
}

export default set;