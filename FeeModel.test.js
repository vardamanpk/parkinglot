const FeeModelFactory = require('./FeeModelFactory')
describe('FeeModel for Small motorcycle/scooter parking lot', () => {
    let feeModel;
    beforeAll(() => {
        feeModel = FeeModelFactory.getFeeModel('MALL')
    })
    test('should return correct fee for Scooter parked for 56 mins', () => {
        const fee = feeModel.getFee('Scooter', '29-May-2022 14:44:07', '29-May-2022 15:40:07')
        expect(fee).toBe(10)
    }),
    test('should return correct fee for Motorcycle parked for 3 hours 30 mins', () => {
        const fee = feeModel.getFee('Motorcycle', '29-May-2022 14:04:07', '29-May-2022 17:44:07')
        expect(fee).toBe(40)
    })
});

describe('FeeModel for Mall parking lot', () => {
    let feeModel;
    beforeAll(() => {
        feeModel = FeeModelFactory.getFeeModel('MALL')
    })
    test('should return correct fee for Car parked for 6 hours and 1 min', () => {
        const fee = feeModel.getFee('Car', '29-May-2022 14:44:07', '29-May-2022 20:45:07')
        expect(fee).toBe(140)
    }),
    test('should return correct fee for Truck parked for 1 hours and 59 mins', () => {
        const fee = feeModel.getFee('Truck', '29-May-2022 14:44:07', '29-May-2022 16:43:07')
        expect(fee).toBe(100)
    }),
    test('should return correct fee for Car parked for 6 hours and 1 min with different dates', () => {
        const fee = feeModel.getFee('Car', '29-May-2022 20:44:07', '30-May-2022 02:45:07')
        expect(fee).toBe(140)
    }),
    test('should return correct fee for Car parked for 6 hours and 1 min with different months', () => {
        const fee = feeModel.getFee('Car', '31-May-2022 20:44:07', '01-Jun-2022 02:45:07')
        expect(fee).toBe(140)
    })
});

describe('FeeModel for Stadium parking lot', () => {
    let feeModel;
    beforeAll(() => {
        feeModel = FeeModelFactory.getFeeModel('STADIUM')
    })
    test('should return correct fee for Scooter', () => {
        const fee = feeModel.getFee('Scooter', '29-May-2022 14:44:07', '29-May-2022 15:40:07')
        expect(fee).toBe(30)
    }),
    test('should return correct fee for Motorcycle', () => {
        const fee = feeModel.getFee('Motorcycle', '29-May-2022 00:00:00', '29-May-2022 14:59:00')
        expect(fee).toBe(390)
    }),
    test('should return correct fee for Electric SUV', () => {
        const fee = feeModel.getFee('SUV', '28-May-2022 20:00:00', '29-May-2022 7:30:00')
        expect(fee).toBe(180)
    }),
    test('should return correct fee for SUV', () => {
        const fee = feeModel.getFee('SUV', '29-May-2022 00:00:00', '29-May-2022 13:05:00')
        expect(fee).toBe(580)
    })
});

describe('FeeModel for Airport parking lot', () => {
    let feeModel;
    beforeAll(() => {
        feeModel = FeeModelFactory.getFeeModel('AIRPORT')
    })
    test('should return correct fee for Motorcycle parked for 55 mins', () => {
        const fee = feeModel.getFee('Motorcycle', '29-May-2022 14:44:07', '29-May-2022 15:40:07')
        expect(fee).toBe(0)
    }),
    test('should return correct fee for Motorcycle parked for 14 hours and 59 mins', () => {
        const fee = feeModel.getFee('Motorcycle', '29-May-2022 00:00:00', '29-May-2022 14:59:00')
        expect(fee).toBe(60)
    }),
    test('should return correct fee for Motorcycle parked for 1 day and 12 hours', () => {
        const fee = feeModel.getFee('Motorcycle', '29-May-2022 00:00:00', '30-May-2022 12:00:00')
        expect(fee).toBe(160)
    }),
    test('should return correct fee for Car parked for 50 mins', () => {
        const fee = feeModel.getFee('Car', '29-May-2022 14:44:07', '29-May-2022 15:40:07')
        expect(fee).toBe(60)
    }),
    test('should return correct fee for SUV parked for 23 hours and 59 mins', () => {
        const fee = feeModel.getFee('SUV', '29-May-2022 00:00:00', '29-May-2022 23:59:00')
        expect(fee).toBe(80)
    }),
    test('should return correct fee for Car parked for 3 days and 1 hour', () => {
        const fee = feeModel.getFee('Car', '29-May-2022 00:00:00', '01-Jun-2022 01:00:00')
        expect(fee).toBe(400)
    })
});
