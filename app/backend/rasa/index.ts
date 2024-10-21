"use server"
import { UpdateFaqCount } from "../../db/queries/faqs";
import axios from "axios";

const PARSE_URL = `http://${process.env.RASA_HOST}/model/parse`;
const WEBHOOK_URL = `http://${process.env.RASA_HOST}/webhooks/rest/webhook`;
const CONFIDENCE_THRESHOLD = 0.70

const INVALID_QUESTION = "I'm not quite sure about that. Can you please clarify?";

const SendMessageWebhook = async (message: string) => {
    const payload = {
        sender: "user",
        message
    };

    const response = await axios.post(WEBHOOK_URL, payload);
    if (response.status === 200) {
        return response.data;
    } else {
        return {error: "Failed to get response from Rasa"};
    }
}

const SendMessageParse = async (message: string) => {
    const payload = {
        text: message
    }

    const response = await axios.post(PARSE_URL, payload);
    if (response.status === 200) {
        return response.data;
    } else {
        return {error: "Failed to get response from Rasa"};
    }
}

const ProcessResponse = async (response: any[], intent_info: any) => {
    if (intent_info.intent) {
        const confidence = intent_info.intent.confidence;

        if (confidence < CONFIDENCE_THRESHOLD) {
            return INVALID_QUESTION;
        } else {
            for (const reply of response) {
                if (reply.text) {
                    return reply.text;
                } else {
                    return INVALID_QUESTION;
                }
            }
        }
    } else {
        return INVALID_QUESTION;
    }
}

export const GetResponse = async (message: string) => {
    const response = await SendMessageWebhook(message);
    const intent_info = await SendMessageParse(message);
    console.log(response, intent_info)
    const response_text = await ProcessResponse(response, intent_info);
    if (response_text !== INVALID_QUESTION) {
        await UpdateFaqCount(response_text);
    }

    return response_text;
}