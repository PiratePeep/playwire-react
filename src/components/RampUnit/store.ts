type Units = {
    [key: string]: number;
}

class Store {
    units: Units = {};
    getUnitId = (unit: string) => {
        if (typeof this.units[unit] === 'undefined') {
            this.units[unit] = 1;
            return `pw-${unit}`;
        } else {
            ++this.units[unit];
            return `pw-${unit}${this.units[unit]}`
        }
    }
};

export default new Store();
