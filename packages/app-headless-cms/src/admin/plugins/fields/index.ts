import { CmsEditorFieldTypePlugin } from "@webiny/app-headless-cms/types";
import text from "./text";
import longText from "./longText";
import richText from "./richText";
import number from "./number";
import boolean from "./boolean";
import dateTime from "./dateTime";
import file from "./file";

const plugins: CmsEditorFieldTypePlugin[] = [
    text,
    number,
    boolean,
    dateTime,
    richText,
    longText,
    file
];

export default plugins;
