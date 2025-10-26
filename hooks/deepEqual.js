export async function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true; // check values
  
    if (
      obj1 == null || typeof obj1 !== 'object' ||
      obj2 == null || typeof obj2 !== 'object'
    ) // if they are not values or nested objs simple return false.
      return false;
  
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
  
    // if both objects keys are not eqaual means they are not same.
    if (keys1.length !== keys2.length) return false;
    
    // if keys are equal then check each keys value using recursion.
    for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
    }
  
    return true;
}