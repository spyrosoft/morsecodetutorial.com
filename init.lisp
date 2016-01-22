(ql:quickload :hunchentoot)
(ql:quickload :cl-who)

(defpackage :morsecodetutorial
  (:use :common-lisp
        :cl-who
        :hunchentoot
        ))

(in-package :morsecodetutorial)

;; Needed if you set :error-template-directory in the easy-acceptor
(setf hunchentoot::*show-lisp-errors-p* t)

(defvar morsecodetutorial-server
  (make-instance 'hunchentoot:easy-acceptor
                 :document-root "."
                 :error-template-directory "static/error-templates/"
                 :access-log-destination "logs/access.log"
                 :message-log-destination "logs/message.log"
                 :port 8086))

(load "static.lisp")

(hunchentoot:start morsecodetutorial-server)