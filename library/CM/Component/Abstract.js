define(['CM/View/Abstract'], function(CM_View_Abstract) {

  /**
   * @class CM_Component_Abstract
   * @extends CM_View_Abstract
   */
  var CM_Component_Abstract = CM_View_Abstract.extend({
    _class: 'CM_Component_Abstract',

    _ready: function() {
      CM_View_Abstract.prototype._ready.call(this);

      cm.dom.setup(this.$());
    },

    /**
     * Called on popOut()
     */
    repaint: function() {
    },

    bindRepaintOnWindowResize: function() {
      var self = this;
      var callback = function() {
        self.repaint();
      };
      $(window).on('resize', callback);
      this.on('destruct', function() {
        $(window).off('resize', callback);
      });
    },

    /**
     * @return jQuery
     */
    $: function(selector) {
      if (!selector) {
        return this.$el;
      }
      selector = selector.replace('#', '#' + this.getAutoId() + '-');
      return $(selector, this.el);
    },

    popOut: function(options) {
      this.repaint();
      this.$el.floatOut(options);
      this.repaint();

      var self = this;
      this.$el.one('floatbox-close', function() {
        if (cm.window.isHidden(self.el)) {
          self.remove();
        }
        return false;
      });
    },

    popIn: function() {
      this.$el.floatIn();
    },

    /**
     * @param {String} message
     */
    error: function(message) {
      cm.window.hint(message);
    },

    /**
     * @param {String} message
     */
    message: function(message) {
      cm.window.hint(message);
    },

    /**
     * @return jqXHR
     */
    reload: function(params) {
      return this.ajaxModal('reloadComponent', params);
    },

    /**
     * @param {String} className
     * @param {Object|Null} [params]
     * @param {Object|Null} [options]
     * @return jqXHR
     */
    replaceWithComponent: function(className, params, options) {
      if (!this.getParent()) {
        cm.error.triggerThrow('Cannot replace root component');
      }
      var handler = this;
      options = _.defaults(options || {}, {
        'success': function() {
          handler.replaceWithHtml(this.$el);
        },
        'modal': false
      });
      return this.getParent().loadComponent(className, params, options);
    }
  });

  return CM_Component_Abstract;
});
