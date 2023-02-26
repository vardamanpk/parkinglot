const FeeModel = require('./FeeModel');

class FeeModelFactory {
    static getFeeModel(type) {
        const feeModelData = {
            MALL: {
                isTotalFeeSumOfPreviousIntervals: false,
                vehicleTypes: {
                    'Motorcycle/Scooter': [
                        {
                            fee: 10,
                            feeType: 'hourly'
                        }
                    ],
                    'Car/SUV': [
                        {
                            fee: 20,
                            feeType: 'hourly'
                        }
                    ],
                    'Bus/Truck': [
                        {
                            fee: 50,
                            feeType: 'hourly'
                        }
                    ]
                }
            },
            STADIUM: {
                isTotalFeeSumOfPreviousIntervals: true,
                vehicleTypes: {
                    'Motorcycle/Scooter': [
                        {
                            interval: '[0,4) hours',
                            fee: 30,
                            feeType: 'flat'
                        }, {
                            interval: '[4,12) hours',
                            fee: 60,
                            feeType: 'flat'
                        }, {
                            interval: '[12,Infinity) hours',
                            fee: 100,
                            feeType: 'hourly'
                        }
                    ],
                    'Car/SUV': [
                        {
                            interval: '[0,4) hours',
                            fee: 60,
                            feeType: 'flat'
                        }, {
                            interval: '[4,12) hours',
                            fee: 120,
                            feeType: 'flat'
                        }, {
                            interval: '[12,Infinity) hours',
                            fee: 200,
                            feeType: 'hourly'
                        }
                    ]
                }
            },
            AIRPORT: {
                isTotalFeeSumOfPreviousIntervals: false,
                vehicleTypes: {
                    'Motorcycle/Scooter': [
                        {
                            interval: '[0,1) hours',
                            fee: 0,
                            feeType: 'flat'
                        }, {
                            interval: '[1,8) hours',
                            fee: 40,
                            feeType: 'flat'
                        }, {
                            interval: '[8,24) hours',
                            fee: 60,
                            feeType: 'flat'
                        }, {
                            interval: 'Each day',
                            fee: 80,
                            feeType: 'daily'
                        }
                    ],
                    'Car/SUV': [
                        {
                            interval: '[0,12) hours',
                            fee: 60,
                            feeType: 'flat'
                        }, {
                            interval: '[12,24) hours',
                            fee: 80,
                            feeType: 'flat'
                        }, {
                            interval: 'Each day',
                            fee: 100,
                            feeType: 'daily'
                        }
                    ]
                }
            }
        };

        const feeModelObj = feeModelData[type];
        if (! feeModelObj) {
            throw new Error(`Invalid fee model type: ${type}`);
        }

        const feeModel = new FeeModel(type);
        feeModel.setTotalFeeSumOfPreviousIntervals(feeModelObj.isTotalFeeSumOfPreviousIntervals);
        for (const [vehicleType, feeData] of Object.entries(feeModelObj.vehicleTypes)) {
            feeData.forEach(({interval, fee, feeType}) => feeModel.setFee(vehicleType, interval, fee, feeType));
        }

        return feeModel;
    }
}

module.exports = FeeModelFactory;
