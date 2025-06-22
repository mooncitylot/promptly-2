import {
  getDisplayTime,
  getDisplayDate,
  googleCalDisplayTime,
  isDayAfter,
  getFinalBusinessDayOfMonth,
} from './date-util.js'

describe('date-util', () => {
  describe('getDisplayTime', () => {
    test('getDisplayTime - hours closer to 24', () => {
      const d1 = new Date()
      d1.setHours(23)
      d1.setMinutes(0)
      expect(getDisplayTime(d1.toString())).toBe('11:00 PM')

      const d2 = new Date()
      d2.setHours(23)
      d2.setMinutes(30)
      expect(getDisplayTime(d2.toString())).toBe('11:30 PM')
    })

    test('getDisplayTime - minutes less than 10', () => {
      const d = new Date()
      d.setHours(9)
      d.setMinutes(5)
      expect(getDisplayTime(d.toString())).toBe('9:05 AM')
    })

    test('getDisplayTime - end of day', () => {
      const d = new Date()
      d.setHours(23)
      d.setMinutes(59)
      expect(getDisplayTime(d.toString())).toBe('11:59 PM')
    })

    test('getDisplayTime - beginning of day', () => {
      const d = new Date()
      d.setHours(0)
      d.setMinutes(0)
      expect(getDisplayTime(d.toString())).toBe('12:00 AM')
    })
  })
  describe('getDisplayDate', () => {
    test('getDisplayDate - current date', () => {
      const d = new Date()
      expect(getDisplayDate(d.toString())).toBe(`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`)
    })

    test('getDisplayDate - future date', () => {
      const d = new Date()
      d.setDate(d.getDate() + 7)
      expect(getDisplayDate(d.toString())).toBe(`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`)
    })

    test('getDisplayDate - past date', () => {
      const d = new Date()
      d.setDate(d.getDate() - 7)
      expect(getDisplayDate(d.toString())).toBe(`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`)
    })
  })

  //  test googleCalDisplayTime

  //  test googleCalDisplayTime
  describe('date-util', () => {
    describe('googleCalDisplayTime', () => {
      test('googleCalDisplayTime - full day event', () => {
        const event = {
          start: {
            date: '2022-01-01',
          },
          end: {
            date: '2022-01-02',
          },
        }
        // @ts-ignore
        expect(googleCalDisplayTime(event)).toBe('1/1/2022')
      })

      test('googleCalDisplayTime - time based event', () => {
        const event = {
          start: {
            dateTime: '2022-01-01T09:00:00',
          },
          end: {
            dateTime: '2022-01-01T10:30:00',
          },
        }
        // @ts-ignore
        expect(googleCalDisplayTime(event)).toBe('1/1/2022 9:00 AM - 1/1/2022 10:30 AM')
      })

      test('googleCalDisplayTime - multi-day event with start and stop times', () => {
        const event = {
          start: {
            dateTime: '2022-01-01T09:00:00',
          },
          end: {
            dateTime: '2022-01-03T17:00:00',
          },
        }
        // @ts-ignore
        expect(googleCalDisplayTime(event)).toBe('1/1/2022 9:00 AM - 1/3/2022 5:00 PM')
      })
    })
  })
  // isDayAfter
  describe('isDayAfter', () => {
    // test if 1-2-2022 is a day after 1-1-2022
    test('isDayAfter - 1-2-2022 is a day after 1-1-2022', () => {
      const d1 = '1-1-2022'
      const d2 = '1-2-2022'
      expect(isDayAfter(d1, d2)).toBe(true)
    })
  })

  describe('getFinalBusinessDayOfMonth', () => {
    // Only way to test without repeating the logic is to test specific known dates
    test('getFinalBusinessDayOfMonth - march 23 2024 last business day is the 29th', () => {
      expect(getFinalBusinessDayOfMonth(new Date(2024, 2, 1))).toBe(29)
    })

    test('getFinalBusinessDayOfMonth - march 23 2025 last business day is the 28th', () => {
      expect(getFinalBusinessDayOfMonth(new Date(2025, 2, 1))).toBe(28)
    })

    test('getFinalBusinessDayOfMonth - feb 23 2024 last business day is the 29th leap year', () => {
      expect(getFinalBusinessDayOfMonth(new Date(2024, 2, 1))).toBe(29)
    })
  })
})
