<?php

function smarty_function_resource(array $params, Smarty_Internal_Template $template) {
	/** @var CM_Render $render */
	$render = $template->smarty->getTemplateVars('render');
	$site = $render->getSite();

	if (substr($params['file'], -3, 3) == 'css') {
		$url = $render->getUrlResource('css', $params['file']);
		return '<link rel="stylesheet" type="text/css" href="' . $url . '" />';
	} elseif (substr($params['file'], -2, 2) == 'js') {
		$url = $render->getUrlResource('js', $params['file']);
		return '<script type="text/javascript" src="' . $url . '"></script>';
	}
}
