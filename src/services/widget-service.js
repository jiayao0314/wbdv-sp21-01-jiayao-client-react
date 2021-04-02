const WIDGET_URL = process.env.REACT_APP_WIDGET_URL
const TOPICS_URL = WIDGET_URL + "/topics";
const WIDGETS_URL = WIDGET_URL + "/widgets";


export const createWidgetForTopic = (tid, widget) =>
    fetch(`${TOPICS_URL}/${tid}/widgets`, {
        method: "POST",
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

// newly add
export const findAllWidgets = () =>
    fetch(`${WIDGETS_URL}`)
        .then(response => response.json());

export const findWidgetsForTopic = (tid) =>
    fetch(`${TOPICS_URL}/${tid}/widgets`)
        .then(response => response.json())

export const deleteWidget = (wid) =>
    fetch(`${WIDGETS_URL}/${wid}`, {
        method: "DELETE"
    })
        .then(response => response.json())

export const updateWidget = (wid, widget) =>
    fetch(`${WIDGETS_URL}/${wid}`, {
        method: "PUT",
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())


const api = {
    findWidgetsForTopic, createWidgetForTopic, deleteWidget, updateWidget, findAllWidgets
}

export default api;