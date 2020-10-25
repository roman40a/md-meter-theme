function pagination(c, m) {
    var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (var i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (var arr = range, isArray = Array.isArray(arr), i = 0, arr = isArray ? arr : arr[Symbol.iterator]();;) {
        var ref;

        if (isArray) {
            if (i >= arr.length) break;
            ref = arr[i++];
        } else {
            i = arr.next();
            if (i.done) break;
            ref = i.value;
        }

        var n = ref;

        if (l) {
            if (n - l === 2) { rangeWithDots.push(l + 1); }
            else if (n - l !== 1) { rangeWithDots.push('...'); }
        }
        rangeWithDots.push(n);
        l = n;
    }

    return rangeWithDots;
}

function createPagination() {
    var currentPage = parseInt($('.curr-page').text()),
        totalPages = parseInt($('.total-pages').text());
    var url = window.location.href;

    if(totalPages > 1) {
        var paginationArr = pagination(currentPage, totalPages);
        var paginationItem;
        var isCurrent = '';

        for (var i = paginationArr.length - 1; i >= 0; i--) {
            var pageNum = paginationArr[i];

            if (pageNum === currentPage) {
                paginationItem = '<li class="page-number current">' + pageNum + '</li>';
            } else if (typeof pageNum === 'number') {
                var urlArray = url.split('/');
                if(urlArray[urlArray.length - 3] === 'page') {
                    url = url.replace(/\/page\/.*$/,'') + '/';
                }
                paginationItem = '<li class="page-number">' +
                    '<a href=\"' + url + 'page/' + pageNum + '\" aria-label=\"Page ' + pageNum + '\">'
                    + pageNum + '</a>' +
                    '</li>';
            } else {
                paginationItem = '<li class=\"ellipsis\"></li>';
            }
            $('.pagination-previous').after(paginationItem);
        }
    } else {
        $('.pagination').css('display', 'none');
    }
}
createPagination();