import cn from 'classnames';
import React from 'react';
import { IconType } from 'react-icons';
import { VscCheck, VscClose, VscError, VscWarning } from 'react-icons/vsc';
import { useAlertStore } from '../stores';

export const Alert = () => {
  const { alerts, removeAlert } = useAlertStore();

  return (
    <div className="fixed z-50 w-11/12 max-w-md space-y-5 bottom-5">
      {alerts.map((alert) => {
        let Icon: IconType;
        let bgColor: string;

        switch (alert.type) {
          case 'error':
            Icon = VscError;
            bgColor = 'bg-red-300';
            break;
          case 'success':
            Icon = VscCheck;
            bgColor = 'bg-green-300';
            break;
          case 'warning':
            Icon = VscWarning;
            bgColor = 'bg-yellow-300';
        }

        return (
          <div
            key={alert.id}
            className={cn(
              bgColor,
              'text-gray-600 bg-opacity-90 hover:bg-opacity-100 transition transform flex items-center relative sm:rounded-r-sm sm:pl-5',
            )}
          >
            <div className="m-3 sm:m-5">
              <Icon
                className="text-xl fill-current sm:text-2xl"
                title={`${alert.type} icon`}
              />
            </div>
            <p className="flex-1 py-5 overflow-hidden overflow-ellipsis">
              {alert.message}
            </p>
            <button
              onClick={() => removeAlert(alert.id)}
              className="self-start p-3 focus-ring"
            >
              <VscClose size={20} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
