const PathUrl = {
    getLastItemUrl: () => {
        let url    = window.location.href
        url        = url.toString()
        let length = (url.split("/").length - 1)
        url        = url.split("/")

        return url[length]
    }
}

