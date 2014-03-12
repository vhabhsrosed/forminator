module("listItem", {
    setup: function () {
        $('#qunit-fixture').html($('#forminator').html());
        var self = this;
        self.$self = $('#frm-list-name .frm-list-item:first-child');
        self.listItem = createListItem({
            $self: self.$self
        });
        self.defaultFieldValues = {
            'checkbox[]': '', extra: '', hidden: '', id: '',
            'radio': '', select: '', text: '',
            textarea: 'Default Value'
        };
    }
});

test("populates initial data from html", function () {
    deepEqual(this.listItem.get(), this.defaultFieldValues);
});

test("set then get", function () {
    this.listItem.set({ 'checkbox[]': 'foo' });
    deepEqual(
        this.listItem.get(),
        union(this.defaultFieldValues, { 'checkbox[]': 'foo' })
    );
});

test("hard set", function () {
    this.listItem.hardSet({ text: 'foo' });
    deepEqual(getListItemsData(this.$self), { text: 'foo' }, 'old fields are erased');
});

test("set fieldMap", function () {
    var listItem = createListItem({
        $self: this.$self, fieldMap: {
            text: function (value) {
                return value.toUpperCase();
            }
        }
    });
    listItem.set({ text: 'foo', textarea: 'bar' });
    deepEqual(
        getListItemsData(this.$self),
        { text: 'FOO', textarea: 'bar' },
        'field is mapped on set'
    );
});

test("hardSet fieldMap", function () {
    var listItem = createListItem({
        $self: this.$self, fieldMap: {
            text: function (value) {
                return value.toUpperCase();
            }
        }
    });
    listItem.hardSet({ text: 'foo', textarea: 'bar' });
    deepEqual(
        getListItemsData(this.$self),
        { text: 'FOO', textarea: 'bar' },
        'field is mapped on set'
    );
});

test("default fieldMap joins array (set)", function () {
    this.listItem.set({ 'text': ['a', 'b'] });
    deepEqual(
        getListItemsData(this.$self),
        { text: 'a, b', textarea: 'Default Value' }
    );
});

test("default fieldMap joins array (hardSet)", function () {
    this.listItem.hardSet({ 'text': ['a', 'b'] });
    deepEqual(getListItemsData(this.$self), { text: 'a, b' });
});

test("set renders new values", function () {
    this.listItem.set({ 'checkbox[]': 'foo' });
    strictEqual(this.$self.find('[data-field="checkbox[]"]').html(), 'foo');
});

test("set non existant field does not set value", function () {
    this.listItem.set({ wrong: 'foo' });
    deepEqual(this.listItem.get(), this.defaultFieldValues);
});

test("clear", function () {
    this.listItem.clear();
    this.$self.find('[data-field]').each(function () {
        strictEqual($(this).html(), '');
    });
});

test("destroy", function () {
    this.listItem.destroy();
    strictEqual(
        $('#frm-list-container-name .frm-list-item:first-child').length, 0
    );
});

test("setSelected", function () {
    this.listItem.addSelectedClass();
    ok(this.$self.hasClass('selected'), 'has class "selected"');
});

test("clearSelected", function () {
    this.listItem.addSelectedClass();
    this.listItem.removeSelectedClass();
    ok(!this.$self.hasClass('selected'), 'does not have class "selected"');
});

test("double click publishes selected event", function () {
    expect(2);
    var self = this;
    var isAddSelectedClassCalled = false;
    this.listItem.addSelectedClass = function () {
        isAddSelectedClassCalled = true;
    };
    this.listItem.subscribe('selected', function (listItem) {
        deepEqual(listItem, self.listItem, 'passes in listItem object');
        ok(!isAddSelectedClassCalled, 'set selected not called');
    });
    this.$self.dblclick();
});

