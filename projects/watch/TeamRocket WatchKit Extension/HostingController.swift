//
//  HostingController.swift
//  TeamRocket WatchKit Extension
//
//  Created by Nicolas Lebrun on 12/10/2019.
//  Copyright © 2019 Nicolas Lebrun. All rights reserved.
//

import WatchKit
import Foundation
import SwiftUI
import Starscream

class HostingController: WKHostingController<AnyView>, WebSocketDelegate {
    func websocketDidConnect(socket: WebSocketClient) {
        print("toto")
    }

    func websocketDidDisconnect(socket: WebSocketClient, error: Error?) {
        print("toto")
    }

    func websocketDidReceiveMessage(socket: WebSocketClient, text: String) {
        print("toto")
    }

    func websocketDidReceiveData(socket: WebSocketClient, data: Data) {
        print("toto")
    }

    override var body: AnyView {
        let moneyCounter = MoneyCounter()
        return AnyView(ContentView().environmentObject(moneyCounter))
    }

//    func call() {
//
//        let socket = WebSocket(url: URL(string: "wss://localhost:3000/")!)
//        socket.delegate = self
//        //websocketDidConnect
//        socket.onConnect = {
//            print("websocket is connected")
//        }
//        //websocketDidDisconnect
//        socket.onDisconnect = { (error: Error?) in
//            print("websocket is disconnected: \(error?.localizedDescription)")
//        }
//        //websocketDidReceiveMessage
//        socket.onText = { (text: String) in
//            print("got some text: \(text)")
//        }
//        //websocketDidReceiveData
//        socket.onData = { (data: Data) in
//            print("got some data: \(data.count)")
//        }
//        //you could do onPong as well.
//        socket.connect()
//
//        socket.write(data: Data())
//    }
}
