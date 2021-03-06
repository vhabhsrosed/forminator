module('createFormGroup',{
    setup: function () {
        $('#qunit-fixture').html($('#forminator').html());
        var self = this;
        self.$input = $('input[name="text"]');
        self.$group = self.$input.closest('.frm-group');
        self.inputData = null;
        self.disableCalled = null;
        self.enableCalled = null;
        self.formGroup = createFormGroup({
            input: {
                $: function (selector) {
                    return selector ? self.$input.find(selector) : self.$input;
                },
                get: function () { return self.inputData; },
                set: function (data) { self.inputData = data; },
                disable: function () { self.disableCalled = true; },
                enable: function () { self.enableCalled = true; },
                getType: function () { return 'text'; }
            }
        });
    }
});

test('delegates get', function () {
    this.inputData = 'foo';
    strictEqual(this.formGroup.get(), 'foo');
});

test('delegates set', function () {
    this.formGroup.set('bar');
    strictEqual(this.inputData, 'bar');
});

test('delegates disable', function () {
    this.formGroup.disable();
    strictEqual(this.disableCalled, true);
});

test('delegates enable', function () {
    this.formGroup.enable();
    strictEqual(this.enableCalled, true);
});

test('delegates getType', function () {
    strictEqual(this.formGroup.getType(), 'text');
});

test('setFeedback', function () {
    this.formGroup.setFeedback('foo');
    strictEqual(
        this.$group.find('.frm-feedback').html(), 'foo',
        'sets feedback div'
    );
    ok(this.$group.hasClass('error'), 'adds error class');
});

// dependent on test 'setFeedback'
test('clearFeedback', function () {
    this.formGroup.setFeedback('foo');
    this.formGroup.clearFeedback();
    strictEqual(this.$group.find(
        '.frm-feedback').html(), '',
        'clears feedback div'
    );
    ok(!this.$group.hasClass('error'), 'removes error class');
});

test('setSuccess', function () {
    this.formGroup.setSuccess('foo');
    strictEqual(
        this.$group.find('.frm-feedback').html(), 'foo',
        'sets feedback div'
    );
    ok(this.$group.hasClass('success'), 'adds success class');
});

// dependent on test 'setSuccess'
test('clearSuccess', function () {
    this.formGroup.setSuccess('foo');
    this.formGroup.clearSuccess();
    strictEqual(this.$group.find(
        '.frm-feedback').html(), '',
        'clears feedback div'
    );
    ok(!this.$group.hasClass('success'), 'removes success class');
});

test('setFeedback then setSuccess clears error class', function () {
    this.formGroup.setFeedback();
    this.formGroup.setSuccess();
    ok(this.$group.hasClass('success'), 'has success class');
    ok(!this.$group.hasClass('error'), 'error class removed');
});

test('setSuccess then setFeedback clears success class', function () {
    this.formGroup.setSuccess();
    this.formGroup.setFeedback();
    ok(!this.$group.hasClass('success'), 'success class removed');
    ok(this.$group.hasClass('error'), 'has error class');
});
