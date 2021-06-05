
export const NullableString = { type: String, default: null };
export const NullableNumber = { type: Number, default: null };
export const RequiredString = { type: String, required: true };
export const RequiredNumber = { type: Number, required: true };
export const RequiredBoolean = { type: Boolean, required: true };
export const RequiredDate = { type: Date, required: true };
export const OptionalBoolean = { type: Boolean, required: false };
export const OptionalNumber = { type: Number, required: false };
export const OptionalString = { type: String, required: false };
export const OptionalDate = { type: Date, required: false };
export const OptionalNumberArray = { type: [Number], required: false };
export const RequiredAny = { type: {}, required: true };
export const OptionalAny = { type: {}, required: false };
export const RequiredPolygon = {
    type: {
        type: String,
        enum: ['Polygon'],
        required: true
    },
    coordinates: {
        type: [[[Number]]],
        required: true
    }
};
export const RequiredPoint = {
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true
    }
};
