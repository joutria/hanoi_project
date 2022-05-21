import Stack from "./Stack";

class Tower {
  constructor(value) {
    this.disks = new Stack();
    this.name = value;
  }

  add(value) {
    this.disks.push(value);
  }

  moveTopTo(target) {
    if (this.disks.peek()) {
      if (
        target.disks.peek() == null ||
        this.disks.peek().value < target.disks.peek().value
      ) {
        console.log(
          `Moving ${this.disks.peek().value} from ${this.name} to ${
            target.name
          }`
        );
        let top = this.disks.pop();
        target.add(top.value);
        return true;
      } else {
        return false;
      }
    }
  }

  // generador de movimientos
  *moveDisks(n, target, buffer) {
    if (n > 0) {
      yield *this.moveDisks(n - 1, buffer, target);
      yield this.moveTopTo(target);
      yield *buffer.moveDisks(n - 1, target, this);
    }
  }
}

export default Tower;
