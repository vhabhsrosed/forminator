var createSearch = function (fig) {
    var self = createFormBase(fig),
        $self = fig.$,
        request = fig.request;

    $self.submit(function (e) {
        // console.log('search', self.get());
        e.preventDefault();
        request.setFilter(self.get());
        request.search();
    });

    return self;
};