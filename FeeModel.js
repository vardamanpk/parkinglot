class FeeModel {
    constructor(name) {
        this.name = name;
        this.isTotalFeeSumOfPreviousIntervals = false;
        this.feeRates = {};
    }
    /**
     * @param {boolean} isTotalFeeSumOfPreviousIntervals
     * If true, total fee should be sum of all previous intervals
     * If false, total fee should be fee of the interval that the duration falls in
     * Default is false
     */

    setTotalFeeSumOfPreviousIntervals(isTotalFeeSumOfPreviousIntervals) {
        this.isTotalFeeSumOfPreviousIntervals = isTotalFeeSumOfPreviousIntervals;
    }
    /**
     * @param {string} vehicleType
     * @param {string} interval
     * @param {number} fee
     * @param {string} feeType
     * feeType can be 'hourly', 'flat', 'daily'
     * interval can be undefined, 'Each day', '[0, 4)', '[24, Infinity)'
     * If interval is undefined, it should be treated as [0, HOURS_IN_YEAR)
     * If interval is 'Each day', it should be treated as [0, HOURS_IN_YEAR) if that's the first interval
     * If interval is 'Each day', it should be treated as [24, HOURS_IN_YEAR) if that's not the first interval
     * If interval is '[24, Infinity)', it should be treated as [24, HOURS_IN_YEAR)
     */
    setFee(vehicleType, interval, fee, feeType) {
        const HOURS_IN_YEAR = 8760; // Using HOURS_IN_YEAR instead of Infinity for easy calculation
        if (!this.feeRates[vehicleType]) {
            this.feeRates[vehicleType] = [];
        }
        // When Interval not defined, add [0, HOURS_IN_YEAR) as interval
        if (!interval) {
            interval = `[0, ${HOURS_IN_YEAR})`;
        }
        // Replace Infinity with HOURS_IN_YEAR
        if (interval.includes('Infinity')) {
            interval = interval.replace('Infinity', `${HOURS_IN_YEAR}`);
        }
        // Replace 'Each day' with [0, Infinity) if that's the first interval
        if (interval === 'Each day' && this.feeRates[vehicleType].length === 0) {
            interval = `[0, ${HOURS_IN_YEAR})`;
        }
        // Replace 'Each day' with [24, Infinity)
        if (interval === 'Each day') {
            interval = `[24, ${HOURS_IN_YEAR})`;
        }
        this.feeRates[vehicleType].push({interval, fee, feeType});
    }
    /**
     * @param {string} vehicleType
     * @param {string} entryTime
     * @param {string} exitTime
     * @returns {number}
     * entryTime and exitTime are in Date format
     * If vehicleType is not found, throw an error
    */
    getFee(vehicleType, entryTime, exitTime) { /*
        Key in feeRates is of format 'Motorcycle/Scooter' but vehicleType is of format 'Motorcycle'
        If vehicleType is 'Motorcycle' then we need to find the key in feeRates that includes 'Motorcycle'
        */
        vehicleType = Object.keys(this.feeRates).find(key => key.includes(vehicleType));

        const feeRates = this.feeRates[vehicleType];
        if (! feeRates) {
            throw new Error(`Invalid vehicle type: ${vehicleType}`);
        }
        let duration = Math.abs(new Date(exitTime) - new Date(entryTime)) / 1000 / 60 / 60;
        let totalFee = 0;
        for (const {interval, fee, feeType}
        of feeRates) {
            if (duration < 0) 
                break;
            

            let [lowerBound, upperBound] = interval.match(/\d+/g).map(Number);

            if (this.isTotalFeeSumOfPreviousIntervals) {
                if (duration === upperBound) 
                    continue;
                
                const currentIntervalDuration = upperBound - lowerBound;
                const tempDuration = (duration > currentIntervalDuration) ? currentIntervalDuration : duration;
                totalFee += this.calculateFee(tempDuration, fee, feeType);
                duration -= currentIntervalDuration;
            } else if (duration >= lowerBound && duration < upperBound) {
                totalFee = this.calculateFee(Math.ceil(duration), fee, feeType);
            }
        }
        return totalFee;
    }
    /**
     * @param {number} duration 
     * @param {number} fee 
     * @param {string} feeType 
     * @returns number
     */
    calculateFee(duration, fee, feeType) {
        if (feeType === "hourly") {
            return Math.ceil(duration) * fee;
        } else if (feeType === "flat") {
            return fee;
        } else if (feeType === "daily") {
            return Math.ceil(duration / 24) * fee;
        }
    }

}

module.exports = FeeModel;
