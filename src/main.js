var forminator = {};

forminator.init = function (fig) {
    var $self = fig.$,
        url = fig.url,
        factory = createFactory({
            $: $self,
            url: url
        }),
        form = factory.form();

};

window.forminator = forminator;