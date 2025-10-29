// export const vaidatePromoCode = (code) => {
//     const validCodes = ['SAVE100', 'SUMMER50', 'FALL20'];
//     return validCodes.includes(code);
// };
const validCodes = [
  {
    code: "WELCOME100",
    discountType: "flat",
    discountValue: 100,
    minAmount: 500,
    validFrom: new Date("2025-10-01T00:00:00Z"),
    validTill: new Date("2026-12-31T23:59:59Z"),
    usageLimit: 100,
    usedCount: 0,
    active: true
  },
  {
    code: "FESTIVE20",
    discountType: "percent",
    discountValue: 20,
    minAmount: 1000,
    validFrom: new Date("2025-10-15T00:00:00Z"),
    validTill: new Date("2026-11-15T23:59:59Z"),
    usageLimit: 50,
    usedCount: 10,
    active: true
  },
  {
    code: "NEWUSER50",
    discountType: "percent",
    discountValue: 50,
    minAmount: 300,
    validFrom: new Date("2025-09-01T00:00:00Z"),
    validTill: new Date("2026-12-31T23:59:59Z"),
    usageLimit: 1,
    usedCount: 0,
    active: true
  },
  {
    code: "TRAVEL500",
    discountType: "flat",
    discountValue: 500,
    minAmount: 2500,
    validFrom: new Date("2025-10-01T00:00:00Z"),
    validTill: new Date("2026-11-30T23:59:59Z"),
    usageLimit: 20,
    usedCount: 5,
    active: true
  },
  {
    code: "FLASH10",
    discountType: "percent",
    discountValue: 10,
    minAmount: 0,
    validFrom: new Date("2025-10-27T00:00:00Z"),
    validTill: new Date("2026-10-30T23:59:59Z"),
    usageLimit: 1000,
    usedCount: 120,
    active: true
  },
  {
    code: "EXPIRED50",
    discountType: "flat",
    discountValue: 50,
    minAmount: 200,
    validFrom: new Date("2025-01-01T00:00:00Z"),
    validTill: new Date("2025-02-01T23:59:59Z"),
    usageLimit: 10,
    usedCount: 5,
    active: true
  }
];

export const calculateDiscount = (code, amount, type) => {   
    let discount = 0;
    if(code.discountType === 'flat') {
        discount = code.discountValue;
    } else if(code.discountType === 'percent') {
        discount = (code.discountValue / 100) * amount;
    }
    return discount;
}; 

export const isPromoValid = (promo, amount) => {
    const currentDate = new Date();
    console.log("Validating promo:", "promo, for date: ", currentDate, "and amount:", amount);
    if (!promo.active) return false;
    if (currentDate < promo.validFrom || currentDate > promo.validTill) return false;       
    if (promo.usedCount >= promo.usageLimit) return false;
    if (amount < promo.minAmount) return false;
    return true;
}  

export const applyPromo = (req, res, next) => {
    const { code, amount } = req.body;
    if(!req.body.code || !code) {
        next();
        console.log("No promo code provided.");
        return;
    }
    const promo = validCodes.find(p => p.code === code);

    if(!isPromoValid(promo, amount)) {
        console.log("Invalid promo code.");
        return res.status(400).json({ message: "Invalid or expired promo code." });
    } 
    if(amount < promo.minAmount) {
        console.log("Minimum amount not met for promo code.");
        return res.status(400).json({ message: `Minimum amount of ₹${promo.minAmount} required to apply this promo code.` });
    }
    const discount = calculateDiscount(promo, amount);
    console.log(`Promo code applied. Discount: ₹${discount}`);
    req.promoResult = { 
        code: promo.code,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
        discountAmount: discount,
        finalAmount: amount - discount
    }
    // res.json();
    next();
    
}