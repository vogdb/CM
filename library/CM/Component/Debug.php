<?php
class CM_Component_Debug extends SK_Component_Abstract {

	public function checkAccessible() {
		if (!IS_DEBUG) {
			throw new CM_Exception_NotAllowed();
		}
	}

	public function prepare() {
		$debug = CM_Debug::get();
		$stats = $debug->getStats();
		ksort($stats);
		$this->setTplParam('stats', $stats);
		$cacheArray = array();
		$cacheArray['CM_Cache'] = 'CM_Cache';
		$cacheArray['CM_CacheLocal'] = 'CM_CacheLocal';
		$this->setTplParam('clearCacheButtons', $cacheArray);
		$errors = $debug->getErrors();
		foreach ($errors as &$error) {
			$error['file'] = str_replace(DIR_SITE_ROOT, '', $error['file']);
		}
		$this->setTplParam('errors', $errors);
	}

	public static function ajax_clearCache(CM_Params $params, CM_ComponentFrontendHandler $handler, CM_Response_Component_Ajax $response) {
		if (!IS_DEBUG) {
			throw new CM_Exception_NotAllowed();
		}
		$cachesCleared = array();
		if ($params->getBoolean('CM_Cache', false)) {
			CM_Cache::flush();
			$cachesCleared[] = 'CM_Cache';
		}
		if ($params->getBoolean('CM_CacheLocal', false)) {
			CM_CacheLocal::flush();
			$cachesCleared[] = 'CM_CacheLocal';
		}
		$handler->message('Cleared: ' . implode(', ', $cachesCleared));
	}

}
