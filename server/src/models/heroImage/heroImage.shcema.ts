import { model, Schema } from "mongoose";

const heroSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
        },
        subtitle: {
            type: String
        },
        content: {
            type: String
        },
        image: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    }
);

export const HeroImage = model("heroImage", heroSchema);
